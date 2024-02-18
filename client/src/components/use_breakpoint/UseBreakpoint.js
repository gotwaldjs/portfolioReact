import { useState, useEffect } from 'react';



const useBreakpoint = () => {
  const getBreakpoint = () => {
    if (window.innerWidth < 672) return 'sm'; // Small breakpoint
    //if (window.innerWidth < 1056) return 'md'; // Medium breakpoint
    return 'lg'; // Large breakpoint
  };

  const [breakpoint, setBreakpoint] = useState(getBreakpoint());

  useEffect(() => {
    const handleResize = () => {
        const newBreakpoint = getBreakpoint();
        console.log("Window resized to:", newBreakpoint);
        setBreakpoint(newBreakpoint);
      };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;