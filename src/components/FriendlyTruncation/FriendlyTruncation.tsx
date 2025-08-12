import React, { useState, useRef, useEffect, ReactNode } from 'react';
import './FriendlyTruncation.css';

export interface FriendlyTruncationProps {
  /** The content to be truncated. Can be a string or React node. */
  children: ReactNode;
  
  /** Maximum height in pixels before truncation occurs. Default is 100px. */
  maxHeight?: number;
  
  /** Number of lines to show before truncation. Takes precedence over maxHeight if specified. */
  lines?: number;
  
  /** Text displayed at the end of truncated content. Default is '...'. */
  ellipsis?: string;
  
  /** Whether to show full content on hover. Default is true. */
  expandOnHover?: boolean;
  
  /** CSS class name for additional styling. */
  className?: string;
  
  /** Whether the content is allowed to expand on click. Default is false. */
  expandOnClick?: boolean;
  
  /** Text for the 'Read more' button. Only applicable if expandOnClick is true. */
  readMoreText?: string;
  
  /** Text for the 'Show less' button. Only applicable if expandOnClick is true. */
  showLessText?: string;
  
  /** Maximum width of the tooltip in pixels. Default is 400px. */
  tooltipMaxWidth?: number;
  
  /** Position of the tooltip. Default is 'top'. */
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
}

export const FriendlyTruncation: React.FC<FriendlyTruncationProps> = ({
  children,
  maxHeight = 100,
  lines,
  ellipsis = '...',
  expandOnHover = true,
  className = '',
  expandOnClick = false,
  readMoreText = 'Read more',
  showLessText = 'Show less',
  tooltipMaxWidth = 400,
  tooltipPlacement = 'top',
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const lineHeight = useRef<number>(0);

  // Calculate if content is overflowing and needs truncation
  useEffect(() => {
    if (!contentRef.current) return;
    
    // Get the line height for line calculations
    const computedStyle = window.getComputedStyle(contentRef.current);
    lineHeight.current = parseInt(computedStyle.lineHeight) || 
                         parseInt(computedStyle.fontSize) * 1.2; // Fallback if lineHeight is not set

    const contentHeight = contentRef.current.scrollHeight;
    const containerHeight = lines ? (lines * lineHeight.current) : maxHeight;
    
    setIsOverflowing(contentHeight > containerHeight);
  }, [children, maxHeight, lines]);

  // Handle click to expand/collapse content
  const handleToggleExpand = () => {
    if (expandOnClick) {
      setIsExpanded(!isExpanded);
    }
  };

  // Handle showing and positioning the tooltip
  const handleMouseEnter = () => {
    if (expandOnHover && isOverflowing && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate tooltip position based on the container position
      let top = 0;
      let left = 0;
      
      // Adjust position based on specified tooltip position
      switch (tooltipPlacement) {
        case 'top':
          top = -10; // Position above with slight offset
          left = 0;
          break;
        case 'bottom':
          top = rect.height + 10; // Position below with slight offset
          left = 0;
          break;
        case 'left':
          top = 0;
          left = -tooltipMaxWidth - 10; // Position to the left with slight offset
          break;
        case 'right':
          top = 0;
          left = rect.width + 10; // Position to the right with slight offset
          break;
        default:
          top = -10;
          left = 0;
      }
      
      setTooltipPosition({ top, left });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (expandOnHover) {
      setShowTooltip(false);
    }
  };

  // Determine the CSS custom properties for the component
  const cssVars = {
    '--max-height': lines ? `${lines * lineHeight.current}px` : `${maxHeight}px`,
    '--tooltip-max-width': `${tooltipMaxWidth}px`,
  } as React.CSSProperties;

  return (
    <div 
      className={`friendly-truncation ${className}`} 
      style={cssVars}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-expand-on-hover={expandOnHover}
    >
      <div className="truncated-content" ref={contentRef}>
        {children}
        
        {isOverflowing && (
          <div className="blur-overlay">
            <span className="ellipsis">{ellipsis}</span>
          </div>
        )}
      </div>
      
      {isOverflowing && expandOnClick && (
        <button 
          className="toggle-button" 
          onClick={handleToggleExpand}
          aria-expanded={isExpanded}
        >
          {isExpanded ? showLessText : readMoreText}
        </button>
      )}
      
      {expandOnHover && showTooltip && isOverflowing && (
        <div 
          className="content-tooltip"
          style={{ 
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
          ref={tooltipRef}
          role="tooltip"
        >
          <div className="tooltip-content">
            {children}
          </div>
        </div>
      )}
      
      {isExpanded && expandOnClick && (
        <div className="expanded-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default FriendlyTruncation;
