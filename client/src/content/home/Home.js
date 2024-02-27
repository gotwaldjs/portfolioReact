import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Grid,
  Column,
  Button
} from '@carbon/react';
import {
  Email,
  Password,
  Credentials
} from '@carbon/react/icons';
import {
  CapabilitiesCard,
  ToolCard
} from '../../components/card/Card';
import { LandingPageBanner } from '../../components/page_header/PageHeader';
import renderWorkCard from '../../components/renderWorkCard/RenderWorkCard';
import WorkModal from '../../components/workModal/WorkModal';
import headshot from '../../media/hs/headshot.JPG';
import useFetchData from '../dataHook';
import { useModalManagement, useToast } from '../../components/custom_hooks/homeHooks';
import './home-page.scss';

function Home() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const { data: homeData, loading, error } = useFetchData('/home/data');
  const navigate = useNavigate();

  // Custom hooks for modal and toast management
  const { isModalOpen, selectedWorkItem, modalHeading, openModal, closeModal } = useModalManagement();
  const { showToast, toastMessage, isToastSuccess, triggerToast } = useToast();


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { welcomeMat, statusTrue, statusFalse, title, open, briefography, capabilities, tools, work, workPrivate, workAvailable, incompletedProjModal } = homeData.home.content;

  const onLoginButtonClick = () => {
    navigate('/login');
  };

  const onRequestCredsButtonClick = () => {
    navigate('/request-credentials');
  };

  const handleCardClick = (workItem) => {
    setSelectedWorkItem(workItem);
    if (isAuthenticated) {
      navigate('/mas');
    } else {
      toggleModal();
    }
  };


  return (
    <>
      <Grid condensed>
        <Column lg={16} md={8} sm={4}>
          <LandingPageBanner
            welcomeMat={welcomeMat}
            open={open}
            statusTrue={statusTrue}
            statusFalse={statusFalse}
            title={title}
            imageSrc={headshot} />
        </Column>
        <Column lg={{ span: 12, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__content">
          <h1 className="landing-page__section-heading">
            Briefography
          </h1>
          <p className="landing-page__section-content">
            {briefography}
          </p>
        </Column>
        <Column lg={{ span: 12, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__content">
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
                  renderIcon={Password}
                >
                  Access All Work
                </Button>
                <Button
                  style={{ marginBottom: '24px' }} // Using CSS variable
                  kind="secondary"
                  renderIcon={Credentials}
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
            {renderWorkCard(workItem, isAuthenticated, handleCardClick)}
          </Column>
        ))}
        {isModalOpen && (
          <WorkModal

            isPrivate={selectedWorkItem.private}
            incomplete={selectedWorkItem.incomplete}
            onRequestAccess={handleRequestAccess} // Function to handle request access
            onClose={onClose} // Function to close the modal
            lockedModalCopy={workPrivate} // Copy for locked projects
            incompleteModalCopy={incompletedProjModal} // Copy for incomplete projects
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
            onCloseModal={handleModalClose}
            onSubmission={handleSubmissionResult} />
        )}

        <Column lg={{ span: 12, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__content">
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
              bullets={capability.bullets} />
          </Column>
        ))}
        <Column lg={{ span: 12, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__content">
          <div className="sectionBorder"></div>
          <h1 className="landing-page__section-heading">
            Primary Tools
          </h1>
        </Column>
        {tools.map((tool, index) => (
          <Column
            lg={index % 8 === 0 ? { span: 1, offset: 2 } : 1}
            md={{ span: 4, offset: 0 }}
            sm={{ span: 1, offset: 0 }}
            key={tool.id}
            className="landing-page__tool-cards"
          >
            <ToolCard
              label={tool.label}
              image={tool.image} />
          </Column>
        ))}
        <Column lg={{ span: 12, offset: 2 }} md={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} className="landing-page__statusFooterContent">
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
                renderIcon={Email}
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
