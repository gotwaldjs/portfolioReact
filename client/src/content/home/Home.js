import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Grid,
  Column,
  Button
} from '@carbon/react';
import {
  Email16,
  Password16,
  Credentials16
} from '@carbon/icons-react';
import {
  CapabilitiesCard,
  ToolCard
} from '../../components/card/Card';
import {
  ContactMe,
  SubmitNotifiication
} from '../../components/contact-me-modal/ContactMe';
import { LandingPageBanner } from '../../components/page_header/PageHeader';
import renderWorkCard from '../../components/renderWorkCard/RenderWorkCard';
import { SubmitNotification } from '../../components/contact-me-modal/ContactMe';
import WorkModal from '../../components/workModal/WorkModal';
import headshot from '../../media/hs/headshot.JPG';
import data from './home.json';
import './home-page.scss';


const Home = () => { 
    const { welcomeMat, statusTrue, statusFalse, title, open, briefography, capabilities, tools, work, workPrivate, workAvailable, incompletedProjModal } = data.home.content;

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWorkItem, setSelectedWorkItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [modalHeading, setModalHeading] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isToastSuccess, setIsToastSuccess] = useState(false);

    
    const onLoginButtonClick = async () => {
      console.log('Access All Work button clicked');
      // Redirect to the login page
      navigate('/login');
    }

    const onRequestCredsButtonClick = async () => {
      console.log('Request Credentials button clicked');
      // Redirect to the login page
      navigate('/request-credentials');
    }
  
  
    const handleCardClick = (workItem) => {
      setSelectedWorkItem(workItem);
    
      // Check if the user is logged in
      if (isAuthenticated) {
        // If logged in, navigate to the /mas route
        navigate('/mas');
      } else {
        // If not logged in, open a modal
        setIsModalOpen(true);
      }
    };
    
    const onClose = () => {
      setIsModalOpen(false);
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
    
  
    const modalCopy = selectedWorkItem && selectedWorkItem.private
      ? workPrivate // Copy for locked projects
      : workAvailable; // Copy for incomplete projects
  
      const handleRequestAccess = async (formData) => {
        setIsLoading(true); // Start loading before the request
      
        try {
          const response = await fetch('/requestCredsForm/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
      
          const data = await response.json();
      
          if (response.ok && data.success) {
            setToastMessage(data.message || "Submission Successful");
            setIsToastSuccess(true);
            setShowToast(true);
          } else {
            setToastMessage(data.message || "Submission Failed");
            setIsToastSuccess(false);
            setShowToast(true);
          }
        } catch (error) {
          setToastMessage("An error occurred during submission.");
          setIsToastSuccess(false);
          setShowToast(true);
          console.error('Error during request access:', error);
        } finally {
          setIsLoading(false); // Stop loading irrespective of request outcome
        }
      };
      


    const handleReqCredFormSubmissionSuccess = (message) => {
      setSuccessMessage(message);
      setShowSuccessModal(true);
    };
    
    const handleModalClose = (result) => {
      setIsModalOpen(false); // Close the LockedProject modal
      if (result && result.success) {
          setShowSuccessModal(true); // Show the success modal based on the result
      } else {
          // Handle failure case if needed
      }
    };
    
    
    return (
      <>
      <Grid condensed>
        <Column lg={16} md={8} sm={4}>
            <LandingPageBanner          
                welcomeMat = {welcomeMat}
                open = {open}
                statusTrue = {statusTrue}
                statusFalse = {statusFalse}
                title = {title}
                imageSrc = {headshot}
            />
        </Column>
        <Column lg ={{ span: 12, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__content">
            <h1 className="landing-page__section-heading">
            Briefography
            </h1>
            <p className="landing-page__section-content">
                {briefography}
            </p>
        </Column>
        <Column lg ={{ span: 12, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__content">
            <div className="sectionBorder"></div>
            <div className="work-header-container">
                <h1 className="landing-page__section-heading">
                    Work
                </h1>
            </div>
            {!isAuthenticated && (
            <Column>
                <p 
                className="landing-page__section-content"
                style={{ paddingBottom: '16px' }} // Using CSS variable
                >
                {workPrivate}
                </p>
                <div className="landing-page__section-content">
                <Button
                style={{ marginBottom: '24px', marginRight: '1px' }} // Using CSS variable
                onClick={onLoginButtonClick}
                renderIcon={Password16}
                >
                    Access All Work
                </Button>
                <Button 
                    style={{ marginBottom: '24px' }} // Using CSS variable
                    kind="secondary" 
                    renderIcon={Credentials16}
                    onClick={onRequestCredsButtonClick}
                >
                    Request Credentials
                </Button>  
                </div>
            </Column>
            )}
            
            {isAuthenticated && (
            <Column>
                <p className="landing-page__section-content">
                {workAvailable}
                </p>
            </Column>
            )}
        </Column>
        {work.map((workItem, index) => (
            <Column
                lg={index % 3 === 0 ? { span: 4, offset: 2 } : 4}
                md={{ span: 4, offset: 0 }}
                sm={{ span: 4, offset: 0 }}
                key={workItem.id}
                className="landing-page__cards"
            >
                {renderWorkCard(workItem, isAuthenticated, handleCardClick)} {/* Pass isAuthenticated here */}
            </Column>
        ))}
        {isModalOpen && (
            <WorkModal

                isPrivate={selectedWorkItem.private}
                incomplete={selectedWorkItem.incomplete}
                onRequestAccess={handleRequestAccess} // Function to handle request access
                onClose= {onClose} // Function to close the modal
                lockedModalCopy={workPrivate} // Copy for locked projects
                incompleteModalCopy={incompletedProjModal} // Copy for incomplete projects
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                showSuccessModal={showSuccessModal}
                setShowSuccessModal={setShowSuccessModal}
                onCloseModal={handleModalClose}
                onSubmission={handleSubmissionResult}
            />
        )}
        
        <Column lg ={{ span: 12, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__content">
            <div className="sectionBorder"></div>
            <h1 className="landing-page__work-heading">
            Capabilities
            </h1>
        </Column>
        {capabilities.map((capability, index) => (
        <Column
            lg={index % 3 === 0 ? { span: 4, offset: 2 } : 4}
            md={8}
            sm={4}
            key={capability.id}
            className="landing-page__cards"
        >
            <CapabilitiesCard 
            label={capability.label} 
            bullets={capability.bullets}
            />
        </Column>
        ))}
        <Column lg ={{ span: 12, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__content">
            <div className="sectionBorder"></div>
            <h1 className="landing-page__section-heading">
            Primary Tools
            </h1>
        </Column>
        {tools.map((tool, index) => (
        <Column
          lg={index % 8 === 0 ? { span: 1, offset: 2 } : 1}
          md={{span: 4, offset: 0}}
          sm={{span: 1, offset:0}}
          key={tool.id}
          className="landing-page__tool-cards"
        >
          <ToolCard 
            label={tool.label} 
            image={tool.image}
          />
        </Column>
        ))}
        <Column lg ={{ span: 12, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__statusFooterContent">
            {open && (
            <>
            <div className="addBorderContactBottom"></div>
            <h1 className="landing-page__Contact-section-heading">
            Contact Me
            </h1>
            <p className="landing-page__footerContact">
              {statusTrue}
            </p>
            <Button 
              className="landing-page_FooterButton"
              renderIcon={Email16}
            >
              Contact Me
            </Button>
          </>
        )}
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
    </>
  );
}

export default Home;
