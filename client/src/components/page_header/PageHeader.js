import React, { useState } from 'react';
import { Row, Column, Button } from '@carbon/react';
import { Email16 } from '@carbon/icons-react';
import { CircularImage } from '../headshot/Headshot';
import useBreakpoint from '../use_breakpoint/UseBreakpoint';
import {ContactMe, SubmitNotification} from '../contact-me-modal/ContactMe';
import './page-header.scss'; // Your custom SCSS file

export const LandingPageBanner = ({ welcomeMat, open, statusTrue, title, imageSrc }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const toggleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };

  const breakpoint = useBreakpoint();
  console.log("Current breakpoint:", breakpoint);

  // Define imageSize as an object with sizes for each breakpoint
  const imageSize = {
    sm: '80px',
    md: '260px', // Assuming 280px for medium as well
    lg: '260px'
  };

  const [showSubmitNotification, setShowSubmitNotification] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleSubmissionResult = (success, message) => {
    setShowSubmitNotification(true);
    setSubmitSuccess(success);
    setSubmitMessage(message);
    setIsContactModalOpen(false); // Close the ContactMe modal
  };

  console.log("Image size set to:", imageSize[breakpoint]);

  return (
    <Row className="landing-page__banner">
      <Column lg={15} md={7} sm={3} className="landing-page__content">
        {showSubmitNotification && (
          <div className="submit-notification-wrapper">
            <SubmitNotification 
              success={submitSuccess}
              message={submitMessage}
              onClose={() => setShowSubmitNotification(false)}
            />
          </div>
        )}
        <h1 className="landing-page__heading">
          {welcomeMat}
        </h1>
        <p className="landing-page__banner_roles_heading">
          {title}
        </p>
      </Column>
      <Column lg={1} md={1} sm={1}>
        <CircularImage imageSrc={imageSrc} size={imageSize[breakpoint]} />
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__statusContent">
        {open && (
          <>
            <p className="landing-page__open-roles">
              {statusTrue}
            </p>
            <Button 
              className="landing-page_button" 
              renderIcon={Email16}
              onClick={toggleContactModal}
            >
              Contact Me
            </Button>
          </>
        )}
      </Column>
      {isContactModalOpen && (
        <ContactMe 
          onClose={() => setIsContactModalOpen(false)} 
          onSubmission={handleSubmissionResult} />
      )}
    </Row>
  );
};



