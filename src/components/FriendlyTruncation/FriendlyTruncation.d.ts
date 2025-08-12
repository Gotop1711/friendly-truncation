/**
 * FriendlyTruncation Component
 * 
 * A React component for truncating text content with a fade effect.
 * Supports hover-to-expand, click-to-expand, and line-based truncation.
 * 
 * @example
 * // Basic example with hover to expand
 * <FriendlyTruncation maxHeight={100}>
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit...
 * </FriendlyTruncation>
 * 
 * @example
 * // Line-based truncation with custom ellipsis
 * <FriendlyTruncation lines={3} ellipsis="[read more]">
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit...
 * </FriendlyTruncation>
 * 
 * @example
 * // Click to expand/collapse with custom button text
 * <FriendlyTruncation 
 *   maxHeight={100} 
 *   expandOnClick={true}
 *   expandOnHover={false}
 *   readMoreText="Show all content" 
 *   showLessText="Collapse"
 * >
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit...
 * </FriendlyTruncation>
 */
declare module 'friendly-truncation' {
  import { ReactNode } from 'react';

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
  }

  export const FriendlyTruncation: React.FC<FriendlyTruncationProps>;
  
  export default FriendlyTruncation;
}
