import React from 'react';
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
}

export const FriendlyTruncationV2: React.FC<FriendlyTruncationV2Props> = ({
  children,
  lines = 3,
  lineHeight = '1.5em',
  className = '',
  title = '',
  style = {},
}) => {
  // Combine the CSS custom properties with any additional styles
  const customStyles = {
    '--truncate-line-height': lineHeight,
    '--truncate-lines': lines,
    ...style,
  } as React.CSSProperties;

  return (
    <div 
      className={`friendly-truncation-v2 ${className}`}
      style={customStyles}
      title={typeof children === 'string' ? (title || children) : title}
      data-title={typeof children === 'string' ? (title || children) : title}
    />
  );
};

export default FriendlyTruncationV2;
