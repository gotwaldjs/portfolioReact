import React from 'react';
import './Timeline.scss';
import '../../content/main_styles/main.scss';

export const CustomTimelineItem = ({ leftText, rightTextHeader, rightTextBody }) => {
  return (
    <div className="custom-timeline-item-v3">
      <div className="left-text-container">
        <span className="left-text">{leftText}</span>
      </div>
      <div className="circle">
      </div>
      <div>
        <div className="right-text-header">{rightTextHeader}</div>
        <div className="right-text-body">{rightTextBody}</div>
      </div>
    </div>
  );
};

export const TimelineItemNoSeperator = ({ leftText, rightTextHeader, rightTextBody }) => {
  return (
    <div className="custom-timeline-item-v4">
      <div className="left-text-container">
        <span className="left-text">{leftText}</span>
      </div>
      <div className="circle">
      </div>
      <div>
        <div className="right-text-header">{rightTextHeader}</div>
        <div className="right-text-body">{rightTextBody}</div>
      </div>
    </div>
  );
};

export const TimelineSeperator = () => {
  return (
    <div className="timeline-separator"></div>
  );
};

export const TimelineContainer = ({ children }) => {
  return (
    <div className="timeline-container">
      {children}
    </div>
  );
};
  
