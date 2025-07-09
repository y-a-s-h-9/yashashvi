import React from 'react';

interface ScrollIndicatorProps {
  isScrolling: boolean;
  progress?: number;
  className?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ 
  isScrolling, 
  progress = 0,
  className = ''
}) => {
  // This component is no longer used but kept for potential future use
  return null;
};

export default ScrollIndicator;