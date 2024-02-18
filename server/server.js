require('dotenv').config();
const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const { WebAppStrategy } = require('ibmcloud-appid');
const { SendEmailCommand, SESClient } = require("@aws-sdk/client-ses");
const { EventBridgeClient, PutRuleCommand, PutTargetsCommand } = require("@aws-sdk/client-eventbridge");




const app = express();
app.use(express.static(path.join(__dirname, './../client/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './../client/build', 'index.html'));
});
app.listen(process.env.PORT || 8080);

// Environment variables for configuration
const LANDING_PAGE_URL = "/";
const LOGIN_URL = "/login";
const CALLBACK_URL = "/ibm/appid/callback"; // Added leading '/' for consistency
const LOGOUT_URL = "/logout";
const ROP_LOGIN_PAGE_URL = "/login";
const REDIRECT_URI = "http://localhost:3000/";

// Configuration for IBM App ID
const appIDConfig = {
    clientId: process.env.CLIENT_ID,
    tenantId: process.env.TENANT_ID,
    secret: process.env.SECRET,
    oauthServerUrl: process.env.OAUTH_SERVER_URL,
    redirectUri: process.env.REDIRECT_URI
};

// BodyParser Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Session Middleware for session management
app.use(session({
    secret: '123456abcdef', // Use a different variable or hardcode your secret
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration for IBM App ID
passport.use(new WebAppStrategy(appIDConfig));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

app.get('/logout', (req, res) => {
    req.logout(); // Passport's way of logging a user out
    res.redirect(LANDING_PAGE_URL); // Redirect to the landing page after logout
});

// Route for handling form submissions from your React app
app.post("/form/submit", bodyParser.urlencoded({ extended: false }), passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: LANDING_PAGE_URL,
    failureRedirect: ROP_LOGIN_PAGE_URL,
    failureFlash: true // Allow flash messages
}));


// AWS Configuaration
// Set the AWS Region from environment variable or default
const REGION = process.env.AWS_REGION || "us-east-1";

// Create SES service object
const sesClient = new SESClient({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

app.post("/requestCredsForm/submit", bodyParser.json(), async (req, res) => {
    const { name, email, purpose } = req.body;
    //console.log("Received req.body:", req.body);
    //console.log("field1", name);
    //console.log("field2", email);
    //console.log("AWS Verified", process.env.AWS_SES_VERIFIED_EMAIL);
    //console.log("dropdown", purpose);

    const params = {
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
        Destination: {
            ToAddresses: [process.env.AWS_SES_VERIFIED_EMAIL]
        },
        ReplyToAddresses: [email],
        Message: {
            Subject: {
                Data: 'Credential Request Submission'
            },
            Body: {
                Html: {
                    Data: `<p><strong>Requester's Name:</strong> ${name}</p>
                           <p><strong>User Email:</strong> ${email}</p>
                           <p><strong>Requested Access:</strong> ${purpose}</p>`
                }
            }
        }
    };

    const sendEmailCommand = new SendEmailCommand(params);

    try {
        const data = await sesClient.send(sendEmailCommand);
        res.status(200).json({ message: "Your request for access crendentials has been submitted. I'll send an Email to you with those shortly. I check for these each day", success: true });
        console.log("Crendtials Request successful");

    } catch (error) {
        console.error("Error sending email", error);
        res.status(500).json({ message: 'There was an error submitting your request. Please try again in a few minutes.', success: false });
        console.log("Crendtials Request failed");
    }
});

app.post("/contactMe/submit", bodyParser.json(), async (req, res) => {
    const { name, email, purpose, additionalInfo } = req.body;
    //console.log("Received req.body:", req.body);
    //console.log("field1", name);
    //console.log("field2", email);
    //console.log("AWS Verified", process.env.AWS_SES_VERIFIED_EMAIL);
    //console.log("dropdown", purpose);

    const params = {
        Source: process.env.AWS_SES_VERIFIED_EMAIL,
        Destination: {
            ToAddresses: [process.env.AWS_SES_VERIFIED_EMAIL]
        },
        ReplyToAddresses: [email],
        Message: {
            Subject: {
                Data: 'Credential Request Submission'
            },
            Body: {
                Html: {
                    Data: `<p><strong>Requester's Name:</strong> ${name}</p>
                           <p><strong>User Email:</strong> ${email}</p>
                           <p><strong>Requested Access:</strong> ${purpose}</p>
                           <p><strong>Requested Access:</strong> ${additionalInfo}</p>`
                }
            }
        }
    };

    const sendEmailCommand = new SendEmailCommand(params);

    try {
        const data = await sesClient.send(sendEmailCommand);
        res.status(200).json({ message: "Thanks for reaching out!. I'll have a look and get back to you shortly.", success: true });
        console.log("Contact Form Submitted Successfully");

    } catch (error) {
        console.error("Error sending email", error);
        res.status(500).json({ message: 'There was an error submitting your request. Please try again in a few minutes.', success: false });
        console.log("Contact Form Submit Failed");
    }
});

const eventBridgeClient = new EventBridgeClient({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

app.post("/schedule-event", bodyParser.json(), async (req, res) => {
    const { ruleName, scheduleExpression, targetArn, input } = req.body;

    // Step 1: Put Rule
    const putRuleParams = {
        Name: ruleName,
        ScheduleExpression: scheduleExpression,
    };

    const putRuleCommand = new PutRuleCommand(putRuleParams);

    try {
        const ruleResponse = await eventBridgeClient.send(putRuleCommand);
        console.log("Rule created:", ruleResponse);

        // Step 2: Put Targets
        const putTargetsParams = {
            Rule: ruleName,
            Targets: [
                {
                    Id: "targetId123", // A unique ID for the target
                    Arn: targetArn,
                    Input: JSON.stringify(input), // Optional: Input for the Lambda function, serialized into a JSON string
                },
            ],
        };

        const putTargetsCommand = new PutTargetsCommand(putTargetsParams);
        const targetsResponse = await eventBridgeClient.send(putTargetsCommand);
        console.log("Targets added:", targetsResponse);

        res.status(200).json({ message: "Event scheduled successfully", success: true });
    } catch (error) {
        console.error("Error scheduling event:", error);
        res.status(500).json({ message: 'There was an error scheduling the event. Please try again.', success: false });
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
