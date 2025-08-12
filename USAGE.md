# Using the FriendlyTruncation Component

This guide explains how to use the FriendlyTruncation component in your React application.

## Installation

To install the component, run:

```bash
npm install friendly-truncation
# or
yarn add friendly-truncation
```

## Basic Usage

```jsx
import { FriendlyTruncation } from 'friendly-truncation';
import 'friendly-truncation/dist/styles.css'; // Don't forget to import the styles!

function MyComponent() {
  return (
    <div>
      <h2>Truncated Text Example</h2>
      <FriendlyTruncation maxHeight={100}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo vel 
        nunc volutpat sollicitudin. Cras consectetur, libero non pharetra finibus, 
        odio nulla vehicula tellus, vel rhoncus mi magna non lacus...
      </FriendlyTruncation>
    </div>
  );
}
```

## Examples

### Height-based Truncation with Hover to Expand

```jsx
<FriendlyTruncation maxHeight={80} expandOnHover={true}>
  {longText}
</FriendlyTruncation>
```

### Line-based Truncation

```jsx
<FriendlyTruncation lines={3}>
  {longText}
</FriendlyTruncation>
```

### Click to Expand/Collapse

```jsx
<FriendlyTruncation 
  maxHeight={100} 
  expandOnHover={false}
  expandOnClick={true}
  readMoreText="Show full text"
  showLessText="Collapse"
>
  {longText}
</FriendlyTruncation>
```

### Custom Ellipsis

```jsx
<FriendlyTruncation 
  maxHeight={80} 
  ellipsis="[Read more]"
>
  {longText}
</FriendlyTruncation>
```

### With Rich HTML Content

```jsx
<FriendlyTruncation maxHeight={100}>
  <div>
    <h3>Section Title</h3>
    <p>This is a paragraph with <strong>formatted text</strong>.</p>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  </div>
</FriendlyTruncation>
```

## All Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | (required) | The content to be truncated |
| `maxHeight` | number | 100 | Maximum height in pixels before truncation occurs |
| `lines` | number | undefined | Number of lines to show before truncation (takes precedence over maxHeight) |
| `ellipsis` | string | '...' | Text displayed at the end of truncated content |
| `expandOnHover` | boolean | true | Whether to show full content on hover |
| `expandOnClick` | boolean | false | Whether to allow expanding/collapsing on click |
| `readMoreText` | string | 'Read more' | Text for the expand button |
| `showLessText` | string | 'Show less' | Text for the collapse button |
| `className` | string | '' | Additional CSS class name for styling |

## Styling Customization

You can customize the component's appearance by targeting its CSS classes:

```css
/* Custom styles for the truncation container */
.friendly-truncation {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
}

/* Customize the fade effect */
.friendly-truncation .fade-overlay {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.9) 70%,
    rgba(255, 255, 255, 1) 100%
  );
}

/* Customize the toggle button */
.friendly-truncation .toggle-button {
  color: #0066cc;
  font-weight: bold;
}
```

## Accessibility

The component is built with accessibility in mind:
- The toggle button is keyboard accessible
- Proper ARIA attributes are used
- Focus states are styled appropriately

## Browser Support

The component supports all modern browsers (Chrome, Firefox, Safari, Edge).
