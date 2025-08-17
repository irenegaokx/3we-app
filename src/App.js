import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './IntroPages/homepage';
import NewAnimation from './IntroPages/new_animation';
import NewAnimation2 from './IntroPages/new_animation2';
import MainEntry from './IntroPages/MainEntry';
import './App.css';

function App() {
  useEffect(() => {
    // Set custom cursor for the entire app and all elements
    const customCursor = 'url("/mouse_cursor_small.png"), auto';
    const customPointerCursor = 'url("/mouse_cursor_small.png"), pointer';
    
    // Apply to body
    document.body.style.cursor = customCursor;
    
    // Apply to all elements
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: ${customCursor} !important;
      }
      button, a, [role="button"], input[type="button"], input[type="submit"], input[type="reset"], 
      .clickable, .cursor-pointer, [onclick], [onClick] {
        cursor: ${customPointerCursor} !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new_animation" element={<NewAnimation />} />
          <Route path="/new_animation2" element={<NewAnimation2 />} />
          <Route path="/main_entry" element={<MainEntry />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
