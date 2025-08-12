import './App.css'
import { FriendlyTruncation } from './components/FriendlyTruncation'
import { FriendlyTruncationV2 } from './components/FriendlyTruncationV2'

// Sample long text for demonstration
const longText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo vel nunc volutpat sollicitudin. 
Cras consectetur, libero non pharetra finibus, odio nulla vehicula tellus, vel rhoncus mi magna non lacus. 
Suspendisse potenti. Morbi mattis purus at nisl vehicula, ut scelerisque libero tempus. Quisque mattis nulla a turpis semper, ac consequat nisl semper. 
Phasellus eu augue at ligula molestie malesuada id ut ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
Nulla facilisi. Curabitur commodo lectus vitae massa tempor, eget efficitur erat interdum. Mauris nec tempor nisi, et gravida diam. 
Donec id nisl quis odio porttitor hendrerit. Sed eu libero vitae velit eleifend dapibus. Pellentesque volutpat ligula a lacus aliquam, id condimentum nunc cursus. 
Nulla eget imperdiet eros. Etiam dictum velit id magna mattis, a lobortis sapien tincidunt. 
Etiam in neque diam. Suspendisse at mauris elementum, semper quam ut, facilisis tellus. 
Donec maximus dui ut velit pretium, sed interdum massa elementum. Donec eget urna scelerisque, vehicula magna a, iaculis dui.
`;

const shortText = "This text is short and won't be truncated unless the maxHeight or lines properties are set very low.";

function App() {
  return (
    <div className="app-container">
      <h1>Friendly Truncation Component</h1>
      
      <div className="demo-section">
        <h2>Hover to See Tooltip (Default)</h2>
        <div className="demo-card">
          <FriendlyTruncation maxHeight={80}>
            {longText}
          </FriendlyTruncation>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Line-based Truncation with Tooltip</h2>
        <div className="demo-card">
          <FriendlyTruncation lines={3}>
            {longText}
          </FriendlyTruncation>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Click to Expand/Collapse (No Hover Tooltip)</h2>
        <div className="demo-card">
          <FriendlyTruncation 
            maxHeight={100} 
            expandOnHover={false}
            expandOnClick={true}
            readMoreText="Read full text"
            showLessText="Collapse text"
          >
            {longText}
          </FriendlyTruncation>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Custom Tooltip Position (Right)</h2>
        <div className="demo-card">
          <FriendlyTruncation 
            maxHeight={80} 
            ellipsis="[More]" 
            tooltipPlacement="right"
            tooltipMaxWidth={300}
          >
            {longText}
          </FriendlyTruncation>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Custom Tooltip Position (Bottom)</h2>
        <div className="demo-card">
          <FriendlyTruncation 
            maxHeight={80} 
            ellipsis="[Hover]" 
            tooltipPlacement="bottom"
            tooltipMaxWidth={350}
          >
            {longText}
          </FriendlyTruncation>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Short Text (No Truncation)</h2>
        <div className="demo-card">
          <FriendlyTruncation maxHeight={100}>
            {shortText}
          </FriendlyTruncation>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>With HTML Content</h2>
        <div className="demo-card">
          <FriendlyTruncation maxHeight={100}>
            <div>
              <p><strong>This is a paragraph with HTML formatting.</strong></p>
              <p>It contains <em>multiple elements</em> and will still be properly truncated.</p>
              <ul>
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
              </ul>
              <p>{longText.substring(0, 200)}...</p>
            </div>
          </FriendlyTruncation>
        </div>
      </div>

      <h1>FriendlyTruncationV2 Component Examples</h1>
      
      <div className="demo-section">
        <h2>Basic Example with Custom Lines</h2>
        <div className="demo-card">
          <FriendlyTruncationV2
            lines={4}
            lineHeight="1.5em"
            backgroundColor="white"
          >
            {longText}
          </FriendlyTruncationV2>
        </div>
      </div>
    </div>
  )
}

export default App
