import React, { useState } from 'react';
import { Modal, TextInput, Select, SelectItem } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import './WorkModal.scss';

const LockedProject = ({ lockedModalCopy, onRequestAccess, onClose, isLoading, setIsLoading, showSuccessModal, setShowSuccessModal }) => {
  
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    console.log('Request button clicked');
        // Redirect to the login page
        navigate('/request-credentials');
  };

  return (
    <>
      <Modal
        open={!showSuccessModal}
        modalHeading="Request Access"
        modalLabel="Locked Project"
        primaryButtonText={"Request Access Credentials"}
        onRequestSubmit={handleSubmit}
        onRequestClose={onClose}
      >
        <p>{lockedModalCopy}</p>
      </Modal>
    </>
  );
};

export const RequestCredsSubmit = ({ requestCredsResponse, onClose }) => {
  const navigate = useNavigate();
  const handleReturnHome = async () => {
    navigate('/'); // Navigate to the home route
  };

  return (
    <>
    <Modal
        open={true}
        modalHeading="Request Submission"
        onRequestClose={onClose}
        primaryButtonText={"Return to Home Screen"}
        onRequestSubmit={handleReturnHome}
    >
        <p>{requestCredsResponse}</p>
    </Modal> 
    </>
  )
};


const IncompleteProject = ({ incompleteModalCopy, onClose }) => (
  <Modal
    open
    passiveModal
    modalHeading="Currently Under Construction"
    modalLabel="Incomplete Project"
    onRequestClose={onClose}
  >
    <p style={{ marginBottom: '1rem' }}>{incompleteModalCopy}</p>
  </Modal>
);


const WorkModal = ({ isPrivate, incomplete, onRequestAccess, onClose, lockedModalCopy, incompleteModalCopy, successMessage, setSuccessMessage }) => {
  if (isPrivate) {
    return <LockedProject 
      lockedModalCopy={lockedModalCopy} 
      onRequestAccess={onRequestAccess} 
      onClose={onClose}
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
    />;
  } else if (incomplete) {
    return <IncompleteProject incompleteModalCopy={incompleteModalCopy} onClose={onClose} />;
  }
  return null;
};

export default WorkModal;
