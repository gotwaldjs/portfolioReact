import React, { useState } from 'react';
import {
    Grid,
    Column,
    Button,
    TextInput,
    DatePicker,
    DatePickerInput,
    TimePicker,
    TimePickerSelect,
    SelectItem,
    Layer,
    Loading
} from '@carbon/react';
import { ArrowRight, Return } from '@carbon/react/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
  

function generateCronExpression(startDate, endDate, time, amPm) {
    // Parse the start and end dates
    const [startDay, startMonth, _] = startDate.split('/').map(Number);
    const [endDay, endMonth, endYear] = endDate.split('/').map(Number);

    // Convert time to 24-hour format if PM is selected
    let [hours, minutes] = time.split(':').map(Number);
    if (amPm.toUpperCase() === 'PM' && hours < 12) {
        hours += 12;
    }
    if (amPm.toUpperCase() === 'AM' && hours === 12) {
        hours = 0; // Midnight adjustment
    }

    // Generating a single cron expression for the given range
    const cronExpression = `${minutes} ${hours} ${startDay}-${endDay} ${startMonth} ? ${endYear}`;

    return cronExpression;
}




const Test = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onReturnButtonClick = async () => {
        console.log('Login button clicked');
        // Redirect to the login page
        navigate('/');
    }

    const [start_date, setStartDate] = useState(''); 
    const [end_date, setEndDate] = useState(''); 
    const [time, setTime] = useState(''); // State for User ID input
    const [am_pm, setAM_PM] = useState(''); // State for Password input
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  
    
    // Utility function to format date to dd/mm/yyyy
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        let day = d.getDate().toString().padStart(2, '0');
        let month = (d.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
        let year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Handle start date change
    const handleStartDateChange = (selectedDates) => {
        // Assuming the first item in selectedDates is the date you need
        const formattedDate = formatDate(selectedDates[0]);
        console.log('Formatted Start Date:', formattedDate);
        setStartDate(formattedDate); // Set as string in dd/mm/yyyy
    };

    // Handle end date change similarly
    const handleEndDateChange = (selectedDates) => {
        // Assuming the first item in selectedDates is the date you need
        const formattedDate = formatDate(selectedDates[0]);
        console.log('Formatted End Date:', formattedDate);
        setEndDate(formattedDate); // Set as string in dd/mm/yyyy
    };


    const handleTimeChange = (event) => {
        const newTime = event.target.value;
        console.log('Time changed:', newTime); // Log the new time
        setTime(newTime);
    };

    const handleAmPmChange = (event) => {
    const newAmPm = event.target.value;
    console.log('AM/PM changed:', newAmPm); // Log the new AM/PM value
    setAM_PM(newAmPm);
    };

    const onSubmitButtonClick = async () => {
        setIsLoading(true);
        let data = null; // Initialize data to null for scope access
    
        try {
            const response = await fetch('/requestCredsForm/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: userId, email: email, purpose: purpose }),
            });
    
            if (!response.ok) {
                // Instead of throwing an error, we directly handle non-OK responses
                console.error(`HTTP error! Status: ${response.status}`);
                setErrorMessage(`Server responded with status: ${response.status}`);
                return; // Early return to stop further processing
            }
    
            data = await response.json(); // Attempt to parse JSON only after checking response status
    
            if (data.success) {
                setShowRequestCredsSubmitModal(true); // Assume this controls visibility of a success modal
                setSuccessMessage(data.message); // Display success message from response
            } else {
                console.error('Submission was not successful:', data.message);
                setErrorMessage(data.message); // Set error message to be displayed to the user
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
            setErrorMessage('An unexpected error occurred. Please try again.'); // Generic error message for the user
        } finally {
            setIsLoading(false); // Ensure loading state is cleared whether request succeeds or fails
        }
    };
    

    
    // Determine if the button should be enabled
    const isButtonDisabled = !start_date || !end_date || !time || !am_pm;


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
                        Set DPR Schedule
                    </h1>
                    <div className="loginBorder"></div>
                    <Layer level={1} className="text-entries">
                        <DatePicker 
                            datePickerType = "single"
                            value={start_date}
                            onClose={(e) => handleStartDateChange(e)}
                            minDate="today"
                            closeOnSelect = {true}

                        >
                            <DatePickerInput 
                                id="date-picker-input-id-start"
                                placeholder="mm/dd/yyyy" 
                                labelText="Start date" 
                                size="md"
                            />
                        </DatePicker>
                            
                    </Layer>
                    <Layer level={1} className="text-entries">
                        <DatePicker 
                            datePickerType = "single"
                            value={end_date}
                            onClose={handleEndDateChange}
                            minDate="today"
                        >
                            <DatePickerInput 
                                id="date-picker-input-id-start"
                                placeholder="mm/dd/yyyy" 
                                labelText="Start date" 
                                size="md"
                            />
                        </DatePicker>
                            
                    </Layer>
                    <Layer level={1} className="text-entries">
                        <TimePicker
                            id="set-am-pm" 
                            labelText="Select Distribution Time"
                            value={time}
                            onChange={handleTimeChange}
                        >
                            <TimePickerSelect
                                id="time-picker-select"
                                onChange={handleAmPmChange}
                                value={am_pm}
                            >
                                <SelectItem value="" text="AM or PM" />
                                <SelectItem value="AM" text="AM" />
                                <SelectItem value="PM" text="PM" />
                            </TimePickerSelect>
                        </TimePicker> 

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
                                renderIcon = {ArrowRight}
                                disabled = {isButtonDisabled}
                                onClick={onSubmitButtonClick}
                            >
                                Set Distribution Time
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

export default Test;