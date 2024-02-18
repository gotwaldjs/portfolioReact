import React, { useState } from 'react';
import {
    Grid,
    Column,
    Button,
    TextInput,
    Layer,
    Loading
} from '@carbon/react';
import { ArrowRight16, Return16 } from '@carbon/icons-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './login-screen.scss';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onReturnButtonClick = async () => {
        console.log('Login button clicked');
        // Redirect to the login page
        navigate('/');
      }

      const [userId, setUserId] = useState(''); // State for User ID input
      const [password, setPassword] = useState(''); // State for Password input
      const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  
    // Function to handle input change for User ID
    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };

    // Function to handle input change for Password
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const onLoginButtonClick = async () => {
        setIsLoading(true); 
        try {
            const response = await fetch('/form/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: userId, password }),
            });
    
            if (response.ok) {
                console.log('Dispatching LOGIN action');
                dispatch({ type: 'LOGIN' });
                navigate('/');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
        setIsLoading(false);
    };
    
    

    // Determine if the button should be enabled
    const isButtonDisabled = !(userId.trim() && password.trim());


    return(
        <Grid condensed>
            <Column lg={ {span: 6, offset: 5} } md={8} sm={4}>
            <Button
                    className="returnHome-button"
                    kind = "ghost"
                    renderIcon = {Return16}
                    onClick={onReturnButtonClick}
                    style = {{ marginTop:'48px'}}
                    >
                    Return to Home
                    </Button>
            </Column>
            <Column lg={ {span: 6, offset: 5} } md={8} sm={4}>
                <div className="login_container">
                    <h1 className="login-screen__heading">
                        Log in
                    </h1>
                    <div className="loginBorder"></div>
                    <Layer level={1} className="text-entries">
                        <TextInput
                            id="input-un"
                            labelText="User ID"
                            placeholder="Enter User ID"
                            value={userId}
                            onChange={handleUserIdChange}
                        />
                    </Layer>
                    <Layer level={1} className="text-entries">
                        <TextInput.PasswordInput
                            id="input-pw" 
                            labelText="Password" 
                            placeholder="Enter Password"
                            value={password}
                            onChange={handlePasswordChange}
                        /> 
                    </Layer>
                    {
                        isLoading ? (
                            <div className="loading-container">
                                <Loading 
                                    style={{height:"20px", width:"20px", marginRight: '8px'}} 
                                    withOverlay={false} 
                                />
                                <p className="verifying-copy">Verifying</p>
                            </div>               
                        ) : (
                            <Button
                                style={{ marginTop:'24px', marginBottom: '48px', marginRight: '1px', marginLeft:'16px' }} // Using CSS variable
                                renderIcon = {ArrowRight16}
                                disabled = {isButtonDisabled}
                                onClick={onLoginButtonClick}
                            >
                                Log in
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
        </Grid>
    )
}

export default LoginScreen;