import './App.css'
import { FriendlyTruncation } from './components/FriendlyTruncation'
import { FriendlyTruncationV2 } from './components/FriendlyTruncationV2'
import { useState } from 'react'

// Default sample text for demonstration
const defaultLongText = `
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

function App() {
  const [userText, setUserText] = useState(defaultLongText);
  const [displayedText, setDisplayedText] = useState(defaultLongText);
  
  const handleApplyText = () => {
    setDisplayedText(userText);
  };
  
  const handleResetText = () => {
    setUserText(defaultLongText);
    setDisplayedText(defaultLongText);
  };
  
  return (
    <div className="app-container">
      <h1>Friendly Truncation Component</h1>
      
      <div className="text-input-section">
        <h2>Try with your own text</h2>
        <div className="input-container">
          <textarea 
            className="text-input" 
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            rows={8}
            placeholder="Enter your text here..."
          />
          <div className="button-group">
            <button className="apply-button" onClick={handleApplyText}>Apply Text</button>
            <button className="reset-button" onClick={handleResetText}>Reset to Default</button>
          </div>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Hover to See Tooltip (Default)</h2>
        <div className="demo-card">
          <FriendlyTruncation maxHeight={80}>
            {displayedText}
          </FriendlyTruncation>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Line-based Truncation with Tooltip</h2>
        <div className="demo-card">
          <FriendlyTruncation lines={3}>
            {displayedText}
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
            {displayedText}
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
            {displayedText}
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
            {displayedText}
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
              <p>{displayedText}</p>
            </div>
          </FriendlyTruncation>
        </div>
      </div>

      <h1>FriendlyTruncationV2 Component Examples</h1>
      
      <div className="demo-section">
        <h2>Basic Example with Custom Lines</h2>
        <div className="demo-card" style={{ backgroundColor: '#484848' }}>
          <FriendlyTruncationV2
            lines={4}
            lineHeight="1.5em"
            style={{ color: 'red' }}
          >
            {displayedText}
          </FriendlyTruncationV2>
        </div>
      </div>

      <div className="demo-section">
        <h2>V2 with Custom Tooltip Placement (Right)</h2>
        <div className="demo-card">
          <FriendlyTruncationV2
            lines={3}
            lineHeight="1.5em"
            tooltipPlacement="right"
            tooltipMaxWidth={300}
          >
            {displayedText}
          </FriendlyTruncationV2>
        </div>
      </div>

      <div className="demo-section">
        <h2>V2 with Custom Tooltip Placement (Bottom)</h2>
        <div className="demo-card">
          <FriendlyTruncationV2
            lines={2}
            lineHeight="1.5em"
            tooltipPlacement="bottom"
            tooltipMaxWidth={350}
          >
            {displayedText}
          </FriendlyTruncationV2>
        </div>
      </div>
    </div>
  )
}

export default App
