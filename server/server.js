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
const { S3Client, GetObjectCommand, PutObjectCommand  } = require('@aws-sdk/client-s3');

const app = express();
// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.user) { // Check if user is authenticated
    return next();
  }
  // If not authenticated, send a 401 Unauthorized response
  res.status(401).json({ message: "User not authenticated" });
}

// Environment variables for configuration
const LANDING_PAGE_URL = "/";
const LOGIN_URL = "/login";
const CALLBACK_URL = "/ibm/appid/callback";
const LOGOUT_URL = "/logout";
const ROP_LOGIN_PAGE_URL = "/login";
const REDIRECT_URI = "http://localhost:3000/";

// Configuration for IBM App ID
const appIDConfig = {
    clientId: process.env.CLIENT_ID,
    tenantId: process.env.TENANT_ID,
    secret: process.env.SECRET,
    oauthServerUrl: process.env.OAUTH_SERVER_URL,
    redirectUri: REDIRECT_URI // Changed to use the variable defined above
};

// Middleware Setup
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET, // It's better to use an environment variable for the secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration for IBM App ID
passport.use(new WebAppStrategy(appIDConfig));
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

// Logout Route
app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect(LANDING_PAGE_URL);
    });
});


// Protected Route Example (Add your protected routes as needed)
app.post("/api/protected", ensureAuthenticated, (req, res) => {
  // Protected route logic here
  res.json({ message: "Access to protected data" });
});

// Form Submission Route
app.post("/form/submit", bodyParser.urlencoded({ extended: false }), passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: LANDING_PAGE_URL,
    failureRedirect: ROP_LOGIN_PAGE_URL,
    failureFlash: true
}));

// AWS SES Configuration and Route
// Set the AWS Region
const REGION = process.env.AWS_REGION || "us-east-1";
const sesClient = new SESClient({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});



const s3 = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});


app.get('/home/data', async (req, res) => {
    try {
      const data = await fetchDataFromS3('my-portfolio-jsg', 'home.json');
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from S3:', error);
      res.status(500).send('Error fetching data');
    }
});

// Function to upload data to S3
async function uploadDataToS3(data) {
    const params = {
        Bucket: bucketName,
        Key: 'home.json', // File name you want to save as in S3
        Body: JSON.stringify(data)
    };

    try {
        const stored = await s3.upload(params).promise();
        console.log('File uploaded successfully at', stored.Location);
    } catch (err) {
        console.error('Error uploading data: ', err.message);
    }
}  

// Function to fetch data from S3
async function fetchDataFromS3(bucketName, key) {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        const command = new GetObjectCommand(params);
        const response = await s3.send(command);
        
        // Assuming the file is text and UTF-8 encoded
        const bodyContents = await streamToString(response.Body);
        //console.log("Data fetched Successfuly", JSON.parse(bodyContents))
        console.log("Data fetched Successfuly")
        return JSON.parse(bodyContents); // Or just return the string if not JSON
    } catch (error) {
        console.error("Error fetching data from S3:", error);
        return null; // Or handle the error as appropriate
    }
}

// Helper function to convert a stream into a string
function streamToString(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    });
}

// Example AWS SES Email Submission Route
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

// Catch-all Route to Serve React App
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// AWS EventBridge Client Configuration
const eventBridgeClient = new EventBridgeClient({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Example AWS EventBridge Schedule Event Route
// Add your EventBridge scheduling logic here

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

