import React, { useState } from 'react';
import { Modal, TextInput, Select, SelectItem, ToastNotification } from '@carbon/react';
import data from '../../content/home/home.json';

export const ContactMe = ({ onClose, onSubmission }) => {
  const { contactMeBlurb } = data.home.content;
  const [userId, setUserId] = useState(''); // State for User ID input
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate form submission
      const response = await fetch('/requestCredsForm/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, purpose: purpose }), // Assuming the variable for name is `name`
      });
      
      if (!response.ok) {
        // If the response is not OK, handle it as a failure directly
        console.error(`HTTP error! Status: ${response.status}`);
        onSubmission(false, "Failed to send your message due to a server error.");
        return; // Stop execution of further logic in this case
      }
      
      const data = await response.json(); // Process response body for successful responses
      
      if (data.success) {
        // Handling success
        onSubmission(true, data.message || "Your message was sent successfully!");
        // Assuming setShowRequestCredsSubmitModal and setSuccessMessage are for managing state for a success modal or notification
      } else {
        // Handling failures reported by the server with a success flag in the JSON body
        onSubmission(false, data.message || "Failed to send your message.");
        console.error('Submission was not successful:', data.message);
      }
    } catch (error) {
      // Handling network errors or problems in the try block
      onSubmission(false, "An error occurred while sending your message.");
      console.error('Error during form submission:', error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset after submission attempt
    }
  };
  

  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
};

  return (
    <Modal
      open={true} // Assuming modal should always be open when this component is rendered
      modalHeading="Contact Form"
      primaryButtonText={isLoading ? "Sending..." : "Submit"}
      secondaryButtonText="Close"
      onRequestSubmit={handleSubmit}
      onRequestClose={onClose}
      primaryButtonDisabled={isLoading || userId === '' || email === '' || purpose === ''}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    >
        <p>{contactMeBlurb}</p>
      <TextInput className="modal-text-entries"
        id="name"
        labelText="Name"
        placeholder="Enter your name"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <TextInput className="modal-text-entries"
        id="email"
        labelText="Email Address"
        placeholder="Enter your Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Select className="modal-text-entries"
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

    </Modal>
  );
};


export const SubmitNotification = ({ success, message, onClose }) => {
  const kind = success ? "success" : "error";

  return (
    <ToastNotification
      role="status"
      caption=""
      timeout={5000}
      title="Contact Submission"
      subtitle={message}
      kind={kind}
      onClose={onClose}
    />
  );
};
