import React, { useState } from 'react';
import {
    Grid,
    Column,
    Button,
    TextInput,
    Select, 
    SelectItem,
    Layer,
    Loading
} from '@carbon/react';
import { ArrowRight, Return } from '@carbon/react/icons';
import { useNavigate } from 'react-router-dom';
import { RequestCredsSubmit } from '../../components/workModal/WorkModal';
import './request-creds.scss';

const RequestCreds = ({ requestCredsResponse }) => {
    const navigate = useNavigate();

    const onReturnButtonClick = async () => {
        console.log('Return Home button clicked');
        // Redirect to the login page
        navigate('/');
    }

    
    const [successMessage, setSuccessMessage] = useState('');
    const [showRequestCredsSubmitModal, setShowRequestCredsSubmitModal] = useState(false);
    const [userId, setUserId] = useState(''); // State for User ID input
    const [email, setEmail] = useState(''); // State for email input
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [purpose, setPurpose] = useState(''); // State for Purpose input
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    // Function to handle input change for User ID
    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };

    // Function to handle input change for Email
    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        setIsEmailValid(isValidEmail(emailValue));
    };

    // Function to handle input change for Email
    const handlePurposeChange = (event) => {
        setPurpose(event.target.value);
    };

    const onSubmitButtonClick = async () => {
        setIsLoading(true); 
        try {
            const response = await fetch('/requestCredsForm/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: userId, email: email, purpose: purpose}),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            if (data.success) {
                // Here we set the modal to be shown based on success
                setShowRequestCredsSubmitModal(true);
                setSuccessMessage(data.message); // Now works since successMessage is defined
            } else {
                console.error('Submission was not successful:', data.message);
            }            
        } catch (error) {
            console.error('Well...shyyyyyyyyyt:', error);
        } finally {
            setIsLoading(false);
        }
    };
    

    // Determine if the button should be enabled
    const isButtonDisabled = !(userId.trim() && email.trim() && purpose.trim() && isEmailValid);


    return(
        <Grid condensed>
            <Column lg={ {span: 6, offset: 5} } md={8} sm={4}>
            <Button
                    className="returnHome-button"
                    kind = "ghost"
                    renderIcon = {Return}
                    onClick={onReturnButtonClick}
                    style = {{ marginTop:'48px'}}
                    >
                    Return to Home
                    </Button>
            </Column>
            <Column lg={ {span: 6, offset: 5} } md={8} sm={4}>
                <div className="login_container">
                    <h1 className="login-screen__heading">
                        Request Credentials
                    </h1>
                    <div className="loginBorder"></div>
                    <Layer level={1} className="text-entries">
                    <TextInput
                        id="request-un"
                        labelText="Name"
                        placeholder="Please enter your name"
                        value={userId}
                        onChange={handleUserIdChange}
                    />
                    </Layer>
                    <Layer level={1} className="text-entries">
                        <TextInput
                            id="input-email" 
                            labelText="Email Adress" 
                            placeholder="Please enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            invalid={!isEmailValid}
                            invalidText="Please enter a valid email address"
                        /> 
                    </Layer>
                    <Layer>
                        <Select className="text-entries"
                            id="purpose"
                            labelText="Purpose of Access"
                            defaultValue=""
                            value={purpose}
                            onChange={handlePurposeChange}
                        >
                            <SelectItem text="Select an option" value="" />
                            <SelectItem text="Looking to hire" value="looking-to-hire" />
                            <SelectItem text="Looking to work together" value="looking-to-work-together" />
                            <SelectItem text="Looking to learn and connect" value="looking-to-learn-and-connect" />
                        </Select>
                    </Layer>
                    {
                        isLoading ? (
                            <div className="loading-container">
                                <Loading 
                                    style={{height:"20px", width:"20px", marginRight: '8px'}} 
                                    withOverlay={false} 
                                />
                                <p className="verifying-copy">Sending Request</p>
                            </div>               
                        ) : (
                            <Button
                                style={{ marginTop:'24px', marginBottom: '48px', marginRight: '1px', marginLeft:'16px' }} // Using CSS variable
                                renderIcon = {ArrowRight}
                                disabled = {isButtonDisabled}
                                onClick={onSubmitButtonClick}
                            >
                                Submit Request
                            </Button>
                        )
                    }
                </div>
            </Column>
            <Column lg={16} md={8} sm={4} className="landing-page__footer">
            <p className="footer__caption">
                "We must all do what we must do, for if we do not, then what we must do does not get done"
            </p>
            <p className="footer__caption_source">
                Chung Mee - Volunteers
            </p>
            <p className="footer__copyright">
                Copyright © 2024, Gebaut von JEFF
            </p>
        </Column>
        {showRequestCredsSubmitModal && (
            <RequestCredsSubmit 
                requestCredsResponse={successMessage} 
                onClose={onReturnButtonClick}
                onRequestSubmit={onReturnButtonClick}
            />
        )}
        </Grid>
    )
}

export default RequestCreds;