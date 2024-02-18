import React from 'react';
import PropTypes from 'prop-types';
import './CircularImage.scss'; // Make sure your SCSS is compiled
import useBreakpoint from '../use_breakpoint/UseBreakpoint';



export const CircularImage = ({ imageSrc, alt, size }) => {
  // Apply styles for different breakpoints in the style prop

  const breakpoint = useBreakpoint();
  console.log("Current breakpoint:", breakpoint);

  const containerAlign = {
    sm: '21%',
    md: '50%', // Assuming 280px for medium as well
    lg: '50%'
  };

  const rightAlign = {
    sm: '-30px',
    md: 0, // Assuming 280px for medium as well
    lg: 0
  };


  const style = {
    width: size, // Default to the largest size
    height: size,
    position: 'absolute', // Positioning it absolutely to align it right
    right: rightAlign[breakpoint], // Align right
    top: containerAlign[breakpoint], // Center vertically
    transform: 'translateY(-50%)', // Adjust for exact vertical centering
  };

  return (
    <div className="circular-container" style={style}>
      <img src={imageSrc} alt={alt} className="circular-image" />
    </div>
  );
};

CircularImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.string,
  top: PropTypes.string
};

CircularImage.defaultProps = {
  alt: '',
  size: {
    lg: '280px', // Default large size
    sm: '60px', // Default small size
    top: '50%'
  },
};
