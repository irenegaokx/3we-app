import React from 'react';
import './MainEntry.css';

function MainEntry() {
  return (
    <div className="main-entry-container">
      <div className="main-entry-content">
        <h1 className="main-entry-title">Main Entry</h1>
        <p className="main-entry-description">
          Welcome to the main entry point of the application.
        </p>
        <div className="main-entry-actions">
          <button className="main-entry-button">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainEntry;
