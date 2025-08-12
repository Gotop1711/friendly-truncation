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

  /** Whether to show custom tooltip on hover. Default is true. */
  showTooltip?: boolean;
  
  /** Maximum width of the tooltip in pixels. Default is 400px. */
  tooltipMaxWidth?: number;
  
  /** Position of the tooltip. Default is 'top'. */
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * FriendlyTruncationV2 - A class-based component designed for maximum compatibility across React versions,
 * including React 18.2.0
 * 
 * This component uses class-based approach which avoids issues with React's
 * internal tracking mechanisms that can cause errors with "recentlyCreatedOwnerStacks"
 */
class FriendlyTruncationV2 extends React.PureComponent<FriendlyTruncationV2Props> {
  containerRef: React.RefObject<HTMLDivElement | null>;
  state: {
    tooltipVisible: boolean;
    tooltipPosition: { top: number; left: number };
  };

  static defaultProps = {
    lines: 3,
    lineHeight: '1.5em',
    className: '',
    title: '',
    style: {},
    showTooltip: true,
    tooltipMaxWidth: 400,
    tooltipPlacement: 'top',
  };

  constructor(props: FriendlyTruncationV2Props) {
    super(props);
    // Use React.createRef() which is compatible with all React versions
    this.containerRef = React.createRef();
    this.state = {
      tooltipVisible: false,
      tooltipPosition: { top: 0, left: 0 },
    };

    // Bind methods to avoid context issues
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    if (!this.props.showTooltip || !this.containerRef.current) return;
    
    try {
      const rect = this.containerRef.current.getBoundingClientRect();
      
      // Calculate tooltip position based on the container position
      let top = 0;
      let left = 0;
      
      // Adjust position based on specified tooltip position
      switch (this.props.tooltipPlacement) {
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
          left = -(this.props.tooltipMaxWidth || 400) - 10; // Position to the left with slight offset
          break;
        case 'right':
          top = 0;
          left = rect.width + 10; // Position to the right with slight offset
          break;
        default:
          top = -10;
          left = 0;
      }
      
      this.setState({
        tooltipPosition: { top, left },
        tooltipVisible: true
      });
    } catch (error) {
      // Silent fail is safer across React versions
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error showing tooltip:', error);
      }
    }
  }

  handleMouseLeave() {
    if (this.props.showTooltip) {
      this.setState({ tooltipVisible: false });
    }
  }

  render() {
    const { 
      children, 
      lines, 
      lineHeight, 
      className = '', 
      title = '', 
      style = {}, 
      showTooltip = true, 
      tooltipMaxWidth = 400, 
    } = this.props;

    // Handle children safely - but don't render them directly in the component's root
    const hasChildren = children !== undefined && children !== null;
    
    // Extract text content for the data-title attribute if possible
    let textContent = '';
    if (typeof children === 'string') {
      textContent = children;
    } else if (typeof children === 'number') {
      textContent = children.toString();
    } else if (React.isValidElement(children)) {
      // Try to get text content from a React element - with type safety
      const childrenProps = children.props as Record<string, unknown>;
      if (childrenProps && typeof childrenProps.children === 'string') {
        textContent = childrenProps.children;
      } else if (childrenProps && typeof childrenProps.children === 'number') {
        textContent = String(childrenProps.children);
      }
    } else if (Array.isArray(children)) {
      // For arrays, concatenate string children
      textContent = children
        .map(child => {
          if (typeof child === 'string') return child;
          if (typeof child === 'number') return child.toString();
          return '';
        })
        .join(' ')
        .trim();
    }
    
    // Combine the CSS custom properties with any additional styles
    const customStyles = {
      '--truncate-line-height': lineHeight || '1.5em',
      '--truncate-lines': lines || 3,
      '--tooltip-max-width': `${tooltipMaxWidth}px`,
      ...style,
    } as React.CSSProperties;

    // Use title if provided, otherwise use extracted text if available
    const contentValue = title || textContent;

    // Handle rendering of the tooltip content
    const renderTooltipContent = () => {
      try {
        // Only render strings, numbers, or valid React elements
        if (typeof children === 'string' || typeof children === 'number' || React.isValidElement(children)) {
          return children;
        }
        
        // For arrays of elements, ensure they're valid before rendering
        if (Array.isArray(children)) {
          return children.map((child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { key: `tooltip-child-${index}` });
            }
            return null;
          });
        }
        
        // Fallback to a basic string representation if content can't be directly rendered
        return textContent || 'Content cannot be displayed';
      } catch {
        // Silent catch - just return fallback content
        return 'Error rendering content';
      }
    };

    return (
      <div 
        className={`friendly-truncation-v2 ${className}`}
        style={customStyles}
        title={showTooltip ? '' : contentValue}
        data-title={
          renderTooltipContent()
        }
        ref={this.containerRef}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {/* This non-breaking space ensures the container has content */}
        <span className="friendly-truncation-v2-content">
          {typeof children === 'string' || typeof children === 'number' 
            ? children 
            : <>&nbsp;</>
          }
        </span>
        
        {/* Only render tooltip if showTooltip is true and tooltip is visible */}
        {!!showTooltip && !!this.state.tooltipVisible && (
          <div 
            className="v2-tooltip"
            style={{ 
              top: this.state.tooltipPosition.top,
              left: this.state.tooltipPosition.left,
              maxWidth: tooltipMaxWidth,
            }}
            role="tooltip"
          >
            <div className="v2-tooltip-content">
              {renderTooltipContent()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Export both as a named export and as default
export { FriendlyTruncationV2 };
export default FriendlyTruncationV2;
