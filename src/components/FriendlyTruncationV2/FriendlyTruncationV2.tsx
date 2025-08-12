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

// Use a class component to avoid React internal tracking issues that can cause
// "Cannot read properties of undefined (reading 'recentlyCreatedOwnerStacks')" error
class FriendlyTruncationV2 extends React.Component<FriendlyTruncationV2Props> {
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
    this.containerRef = React.createRef<HTMLDivElement>();
    this.state = {
      tooltipVisible: false,
      tooltipPosition: { top: 0, left: 0 },
    };
  }

  handleMouseEnter = () => {
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
      console.error('Error showing tooltip:', error);
    }
  };

  handleMouseLeave = () => {
    if (this.props.showTooltip) {
      this.setState({ tooltipVisible: false });
    }
  };

  render() {
    const { 
      children, 
      lines, 
      lineHeight, 
      className, 
      title, 
      style, 
      showTooltip, 
      tooltipMaxWidth, 
    } = this.props;

    // Safe check for children content
    const safeChildren = children || '';

    // Combine the CSS custom properties with any additional styles
    const customStyles = {
      '--truncate-line-height': lineHeight,
      '--truncate-lines': lines,
      '--tooltip-max-width': `${tooltipMaxWidth}px`,
      ...style,
    } as React.CSSProperties;

    const contentValue = typeof safeChildren === 'string' ? (title || safeChildren) : title;

    return (
      <div 
        className={`friendly-truncation-v2 ${className}`}
        style={customStyles}
        title={showTooltip ? '' : contentValue}
        data-title={contentValue}
        ref={this.containerRef}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        &nbsp;
        {showTooltip && this.state.tooltipVisible && (
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
              {safeChildren}
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
