import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';
import { Tag } from '@carbon/react';
import { Locked, Time } from '@carbon/react/icons';


export const Card = ({ imageSrc, title, description, ctaLink, backgroundColor,tagType,tagLabel, isPrivate, currentProj, onCardClick }) => {
  const handleCardClick = () => {
    if (isPrivate || currentProj) {
        onCardClick(); // Call a function passed from parent to handle the click
    } else {
        window.location.href = ctaLink;
    }
  };
  
  return (
    <div className="card" style={{ backgroundColor }} onClick={handleCardClick}>
      <img src={imageSrc} alt="" className="card__image" />
      {isPrivate && (
          <div className="lock-container">
              <Locked size={16} className="lock" />
          </div>
      )}
      {currentProj && !isPrivate && (
          <div className="lock-container">
              <Time size={16} className="lock" />
          </div>
      )}
      <div className="addBorderBottom">
        <p className="card__description">{description}</p>
      </div>
      <div id='card__footer'
        style={{
          alignItems: 'center',
          justifyContent:'space-between'
        }}>
        <Tag
          size="sm"
          title="Clear Filter"
          type={tagType}>
          {tagLabel}
        </Tag>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};

Card.defaultProps = {
  backgroundColor: '#ffffff',
};

export const CardTwoTags = ({ imageSrc, title, description, ctaLink, backgroundColor,tag1,tag2, isPrivate, currentProj, onCardClick }) => {
  const handleCardClick = () => {
    if (isPrivate || currentProj) {
        onCardClick(); // Call a function passed from parent to handle the click
    } else {
        window.location.href = ctaLink;
    }
  };
  
  return (
    <div className="card" style={{ backgroundColor }} onClick={handleCardClick}>
      <div className="card__image-container">
        <img src={imageSrc} alt="" className="card__image" />
        <div className="card__overlay">
          <p className="overlay__title">{title}</p>
        </div>
      </div>
      {isPrivate && (
          <div className="lock-container">
              <Locked size={16} className="lock" />
          </div>
      )}
      {currentProj && !isPrivate && (
          <div className="lock-container">
              <Time size={16} className="lock" />
          </div>
      )}
      <div className="addBorderBottom">
        <p className="card__description">{description}</p>
      </div>
      <div id = "card__footer"
        style={{
          display:'flex',
          alignItems: 'center',
          justifyContent:'space-between'
        }}>
        <div>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag1.type}>
            {tag1.label}
          </Tag>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag2.type}>
            {tag2.label}
          </Tag>
        </div>
      </div>
    </div>
  );
};

CardTwoTags.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  tag1: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  tag2: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired
};

CardTwoTags.defaultProps = {
  backgroundColor: '#ffffff',
  tag1: { type: 'default', label: 'Tag 1' },
  tag2: { type: 'default', label: 'Tag 2' },
};


export const CardThreeTags = ({ imageSrc, title, description, ctaLink, backgroundColor,tag1,tag2,tag3, isPrivate, currentProj, onCardClick }) => {
  const handleCardClick = () => {
    if (isPrivate || currentProj) {
        onCardClick(); // Call a function passed from parent to handle the click
    } else {
        window.location.href = ctaLink;
    }
  };
  
  return (
    <div className="card" style={{ backgroundColor }} onClick={handleCardClick}>
      <div className="card__image-container">
        <img src={imageSrc} alt="" className="card__image" />
        <div className="card__overlay">
          <p className="overlay__title">{title}</p>
        </div>
      </div>
      {isPrivate && (
          <div className="lock-container">
              <Locked size={16} className="lock" />
          </div>
      )}
      {currentProj && !isPrivate && (
          <div className="lock-container">
              <Time size={16} className="lock" />
          </div>
      )}
      <div className="addBorderBottom">
        <p className="card__description">{description}</p>
      </div>
      <div id = "card__footer"
        style={{
          display:'flex',
          alignItems: 'center',
          justifyContent:'space-between'
        }}>
        <div>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag1.type}>
            {tag1.label}
          </Tag>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag2.type}>
            {tag2.label}
          </Tag>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag3.type}>
            {tag3.label}
          </Tag>
        </div>
      </div>
    </div>
  );
};

CardThreeTags.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  tag1: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  tag2: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  tag3: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

CardThreeTags.defaultProps = {
  backgroundColor: '#ffffff',
  tag1: { type: 'default', label: 'Tag 1' },
  tag2: { type: 'default', label: 'Tag 2' },
  tag3: { type: 'default', label: 'Tag 3' },
};

export const CardFourTags = ({ imageSrc, title, description, ctaLink, backgroundColor, tag1, tag2, tag3, tag4, isPrivate, currentProj, onCardClick }) => {
  const handleCardClick = () => {
    if (isPrivate || currentProj) {
        onCardClick(); // Call a function passed from parent to handle the click
    } else {
        window.location.href = ctaLink;
    }
  };

  return (
    <div className="card" style={{ backgroundColor }} onClick={handleCardClick}>
      <div className="card__image-container">
        <img src={imageSrc} alt="" className="card__image" />
        <div className="card__overlay">
          <p className="overlay__title">{title}</p>
        </div>
      </div>
      {isPrivate && (
          <div className="lock-container">
              <Locked size={16} className="lock" />
          </div>
      )}
      {currentProj && !isPrivate && (
          <div className="lock-container">
              <Time size={16} className="lock" />
          </div>
      )}
      <div className="addBorderBottom">
        <p className="card__description">{description}</p>
      </div>
      <div id = "card__footer"
        style={{
          display:'flex',
          alignItems: 'center',
          justifyContent:'space-between'
        }}>
        <div>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag1.type}>
            {tag1.label}
          </Tag>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag2.type}>
            {tag2.label}
          </Tag>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag3.type}>
            {tag3.label}
          </Tag>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag4.type}>
            {tag4.label}
          </Tag>
        </div>
      </div>
    </div>
  );
};

CardFourTags.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  tag1: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  tag2: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  tag3: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  tag4: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

CardFourTags.defaultProps = {
  backgroundColor: '#ffffff',
  tag1: { type: 'default', label: 'Tag 1' },
  tag2: { type: 'default', label: 'Tag 2' },
  tag3: { type: 'default', label: 'Tag 3' },
  tag4: { type: 'default', label: 'Tag 4' },
};

export const CardFiveTags = ({ imageSrc, title, description, ctaLink, backgroundColor,tag1,tag2,tag3,tag4,tag5, isPrivate, currentProj, onCardClick }) => {
  const handleCardClick = () => {
    if (isPrivate || currentProj) {
        onCardClick(); // Call a function passed from parent to handle the click
    } else {
        window.location.href = ctaLink;
    }
  };
  
  return (
    <div className="card" style={{ backgroundColor }} onClick={() => window.location.href = ctaLink}>
      <div className="card__image-container">
        <img src={imageSrc} alt="" className="card__image" />
        <div className="card__overlay">
          <p className="overlay__title">{title}</p>
        </div>
      </div>
      {isPrivate && (
          <div className="lock-container">
              <Locked size={16} className="lock" />
          </div>
      )}
      {currentProj && !isPrivate && (
          <div className="lock-container">
              <Time size={16} className="lock" />
          </div>
      )}
      <div className="addBorderBottom">
        <p className="card__description">{description}</p>
      </div>
      <div id = "card__footer"
        style={{
          display:'flex',
          alignItems: 'center',
          justifyContent:'space-between'
        }}>
        <div>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag1.type}>
            {tag1.label}
          </Tag>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag2.type}>
            {tag2.label}
          </Tag>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag3.type}>
            {tag3.label}
          </Tag>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag4.type}>
            {tag4.label}
          </Tag>
          <Tag
            size="sm"
            title="Clear Filter"
            type={tag5.type}>
            {tag4.label}
          </Tag>
        </div>
      </div>
    </div>
  );
};

CardFiveTags.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaLink: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  tag1: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  tag2: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  tag3: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  tag4: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  tag5: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired
};

CardFiveTags.defaultProps = {
  backgroundColor: '#ffffff',
  tag1: { type: 'default', label: 'Tag 1' },
  tag2: { type: 'default', label: 'Tag 2' },
  tag3: { type: 'default', label: 'Tag 3' },
  tag4: { type: 'default', label: 'Tag 4' },
  tag5: { type: 'default', label: 'Tag 5' }
};

export const CapabilitiesCard = ({ label, bullets}) => {
  return (
    <div className="capabilities-card">
      <h3 className="capabilities-title">{label}</h3>
      <div className="capabilities__border-bottom"></div>
      <div className="bullets-container">
        {bullets.map((bullet, index) => (
          <div key={index} className={`bullet-item ${index % 2 === 0 ? 'left-column' : 'right-column'}`}>
            • {bullet}
          </div>
        ))}
      </div>
    </div>
  );
};

CapabilitiesCard.propTypes = {
  label: PropTypes.string.isRequired,
  bullets: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgroundColor: PropTypes.string,
};

CapabilitiesCard.defaultProps = {
  backgroundColor: '#000000', // Assuming a dark theme similar to the image
};

export const ToolCard = ({ label, image }) => {
  return (
    <div className="tool-card">
      <img src={image} alt={label} className="tool-card__image" />
      <p className="tool-card__label">{label}</p>
    </div>
  );
};

ToolCard.propTypes = {
  label: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};