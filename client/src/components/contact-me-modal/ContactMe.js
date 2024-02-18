import React, { useState } from 'react';
import { Modal, TextInput, TextArea, Select, SelectItem, ToastNotification } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

export const ContactMe = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const additionalInfo = useState('');
  
  const handleSubmit = async () => {
    const formData = { name, email, purpose, additionalInfo };
    const result = await onRequestAccess(formData);
    if (result.success) {
      console.log("onClose type:", typeof onClose);
      onClose(); // Close the LockedProject modal
      sendNotiifcation(true);

    } else {
        console.error('Submission was not successful:', result.message);
        // Here, handle the case where submission was not successful
    }
  };

  return (
    <>
      <Modal
        open={!showSuccessModal}
        modalHeading="Contact Form"
        modalLabel="Contact Form"
        primaryButtonText={isLoading ? "Sending..." : "Submit"}
        secondaryButtonText="Close"
        onRequestSubmit={handleSubmit}
        onRequestClose={onClose}
        primaryButtonDisabled={isLoading || name === '' || email === '' || purpose === ''}
      >
        <p>{lockedModalCopy}</p>
        <div className = "modal-text-entries">
          <TextInput
            id="name"
            labelText="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className = "modal-text-entries">
          <TextInput
            id="email"
            labelText="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className = "modal-text-entries">
          <Select
            id="purpose"
            labelText="Purpose of Access"
            defaultValue=""
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <SelectItem text="Select an option" value="" />
            <SelectItem text="Looking to hire" value="looking-to-hire" />
            <SelectItem text="Looking to work together" value="looking-to-work-together" />
            <SelectItem text="Looking to learn and connect" value="looking-to-learn-and-connect" />
          </Select>
        </div> 
        <div className="modal-text-entries">
            <TextArea 
                labelText="Questions, comments, life wisdoms"
                helperText="Totally Optional but encouraged"
                rows={4}
                value={additionalInfo}
            >
            </TextArea>
        </div>
      </Modal>
    </>
  );
};

export const SubmitNotifiication = (returnValue, returnMessage) => {
  
    const messageKind = async () => {
        const returnValue = await onRequestAccess(formData);
        if (returnValue.success) {
         kind = "success"
        }else{
            kind = "error"
        }
    };

    return (
      <>
        <ToastNotification
            role="status" 
            caption="00:00:00 AM" 
            timeout={5} 
            title="Contact Submit" 
            subtitle={returnMessage}
            kind={messageKind}
        >
        </ToastNotification>
      </>
    );
  };





