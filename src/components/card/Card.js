import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';
import { Tag } from '@carbon/react';


export const Card = ({ imageSrc, title, description, ctaLink, backgroundColor,tagType,tagLabel }) => {
  return (
    <div className="card" style={{ backgroundColor }} onClick={() => window.location.href = ctaLink}>
      <img src={imageSrc} alt="" className="card__image" />
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

export const CardTwoTags = ({ imageSrc, title, description, ctaLink, backgroundColor,tag1,tag2 }) => {
  return (
    <div className="card" style={{ backgroundColor }} onClick={() => window.location.href = ctaLink}>
      <div className="card__image-container">
        <img src={imageSrc} alt="" className="card__image" />
        <div className="card__overlay">
          <p className="overlay__title">{title}</p>
        </div>
      </div>
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


export const CardThreeTags = ({ imageSrc, title, description, ctaLink, backgroundColor,tag1,tag2,tag3 }) => {
  return (
    <div className="card" style={{ backgroundColor }} onClick={() => window.location.href = ctaLink}>
      <div className="card__image-container">
        <img src={imageSrc} alt="" className="card__image" />
        <div className="card__overlay">
          <p className="overlay__title">{title}</p>
        </div>
      </div>
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

export const CardFourTags = ({ imageSrc, title, description, ctaLink, backgroundColor,tag1,tag2,tag3,tag4 }) => {
  return (
    <div className="card" style={{ backgroundColor }} onClick={() => window.location.href = ctaLink}>
      <div className="card__image-container">
        <img src={imageSrc} alt="" className="card__image" />
        <div className="card__overlay">
          <p className="overlay__title">{title}</p>
        </div>
      </div>
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

