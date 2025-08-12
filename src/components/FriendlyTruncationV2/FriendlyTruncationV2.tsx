import React, { useState, useRef } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import './FriendlyTruncationV2.css';

export interface FriendlyTruncationV2Props {
  /** The content to be truncated. Can be a string or React node. */
  children: ReactNode;
  
  /** Number of lines to show before truncation. Default is 3. */
  lines?: number;
  
  /** Line height for the text. Default is "1.5em". */
  lineHeight?: string;
  
  /** CSS class name for additional styling. */
  className?: string;
  
  /** Title attribute for the container (shows as browser tooltip on hover). */
  title?: string;
  
  /** Additional inline styles. */
  style?: CSSProperties;

  /** Whether to show custom tooltip on hover. Default is true. */
  showTooltip?: boolean;
  
  /** Maximum width of the tooltip in pixels. Default is 400px. */
  tooltipMaxWidth?: number;
  
  /** Position of the tooltip. Default is 'top'. */
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
}

export const FriendlyTruncationV2: React.FC<FriendlyTruncationV2Props> = ({
  children,
  lines = 3,
  lineHeight = '1.5em',
  className = '',
  title = '',
  style = {},
  showTooltip = true,
  tooltipMaxWidth = 400,
  tooltipPlacement = 'top',
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle showing and positioning the tooltip
  const handleMouseEnter = () => {
    if (showTooltip && containerRef.current) {
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
      setTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (showTooltip) {
      setTooltipVisible(false);
    }
  };

  // Combine the CSS custom properties with any additional styles
  const customStyles = {
    '--truncate-line-height': lineHeight,
    '--truncate-lines': lines,
    '--tooltip-max-width': `${tooltipMaxWidth}px`,
    ...style,
  } as React.CSSProperties;

  const contentValue = typeof children === 'string' ? (title || children) : title;

  return (
    <div 
      className={`friendly-truncation-v2 ${className}`}
      style={customStyles}
      title={showTooltip ? '' : contentValue}
      data-title={contentValue}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showTooltip && tooltipVisible && (
        <div 
          className="v2-tooltip"
          style={{ 
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            maxWidth: tooltipMaxWidth,
          }}
          role="tooltip"
        >
          <div className="v2-tooltip-content">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendlyTruncationV2;
