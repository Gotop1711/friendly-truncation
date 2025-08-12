# Friendly Truncation

A React component for elegantly truncating text content with a blur effect and tooltip display. This component provides a beautiful user experience for handling excessive text by implementing a gradual blur effect at the truncation point and offering a floating tooltip with the full content on hover.

## Features

- **Fixed Height Container**: Container maintains its original height when truncating content
- **Blur Effect**: Text content fades out with a blur effect at the truncation point
- **Tooltip on Hover**: Shows the full content in a floating tooltip (like HTML title attribute but more elegant)
- **Expand on Click**: Adds a "Read more"/"Show less" toggle button (optional)
- **Line-based Truncation**: Truncate after a specific number of lines
- **Height-based Truncation**: Truncate after a specific height in pixels
- **Custom Ellipsis**: Customize the truncation indicator text
- **Tooltip Positioning**: Control where the tooltip appears (top, bottom, left, right)
- **Supports Rich Content**: Works with HTML/JSX content, not just plain text
- **Fully Customizable**: Styling can be customized via CSS
- **Accessible**: Keyboard navigable and screen reader friendly

## Installation

```bash
npm install friendly-truncation
# or
yarn add friendly-truncation
```

## Usage

```jsx
import { FriendlyTruncation } from 'friendly-truncation';
import 'friendly-truncation/dist/styles.css'; // Import the styles

function App() {
  return (
    <div className="container">
      <h2>Basic Tooltip Example</h2>
      <FriendlyTruncation maxHeight={100}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nullam at justo vel nunc volutpat sollicitudin.
        Cras consectetur, libero non pharetra finibus, odio nulla vehicula tellus...
      </FriendlyTruncation>
      
      <h2>Custom Tooltip Position</h2>
      <FriendlyTruncation 
        maxHeight={80} 
        tooltipPlacement="right"
        tooltipMaxWidth={300}
        ellipsis="[More]"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </FriendlyTruncation>
      
      <h2>Line-based Truncation</h2>
      <FriendlyTruncation lines={3}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </FriendlyTruncation>
      
      <h2>Click to Expand (No Tooltip)</h2>
      <FriendlyTruncation 
        maxHeight={80} 
        expandOnHover={false}
        expandOnClick={true}
        readMoreText="Show full text"
        showLessText="Collapse"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </FriendlyTruncation>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | (required) | The content to be truncated |
| `maxHeight` | number | 100 | Maximum height in pixels before truncation occurs |
| `lines` | number | undefined | Number of lines to show before truncation (takes precedence over maxHeight) |
| `ellipsis` | string | '...' | Text displayed at the end of truncated content |
| `expandOnHover` | boolean | true | Whether to show tooltip with full content on hover |
| `expandOnClick` | boolean | false | Whether to allow expanding/collapsing on click |
| `readMoreText` | string | 'Read more' | Text for the expand button |
| `showLessText` | string | 'Show less' | Text for the collapse button |
| `className` | string | '' | Additional CSS class name for styling |
| `tooltipMaxWidth` | number | 400 | Maximum width of the tooltip in pixels |
| `tooltipPlacement` | 'top' \| 'bottom' \| 'left' \| 'right' | 'top' | Position of the tooltip |

## Customization

You can customize the appearance by overriding the CSS variables or classes:

```css
.friendly-truncation {
  /* Custom styles */
}

.blur-overlay {
  /* Customize the blur effect */
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  backdrop-filter: blur(2px); /* Adjust blur amount */
}

.content-tooltip {
  /* Customize the tooltip */
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.ellipsis {
  /* Customize the ellipsis indicator */
  color: #0066cc;
  font-weight: bold;
}
```

## Accessibility

- The component is fully keyboard navigable when using the `expandOnClick` option
- ARIA attributes are appropriately set for screen readers
- Focus states are styled for keyboard users

## Browser Support

- Supports all modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 is not supported

## Development

This project was created with Vite and React TypeScript template. To set up the development environment:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
```
