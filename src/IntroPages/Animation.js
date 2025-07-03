import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Animation.css';
import mouthHandsImage from '../assets/animation/mouth_hands.png';

function Animation() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [isTextFilled, setIsTextFilled] = useState(false);
  const fullText = "In the cycle of Obscura, beneath the hum of machines, a Covenant was broken.\n\nThe Eye was stolen. The Flesh, pacified. The Will, diluted.\n\nThe Screen became the new altar, and the Feed became the false God.";
  const [showCursor, setShowCursor] = useState(true);

  // 2-second delay before typing starts
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsTypingStarted(true);
    }, 1000);
    
    return () => clearTimeout(delayTimer);
  }, []);

  // Typing effect - only starts after the delay
  useEffect(() => {
    if (isTypingStarted && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText, isTypingStarted]);

  // Navigate to history2 after typing is complete
  useEffect(() => {
    if (isTypingStarted && currentIndex >= fullText.length) {
      const navigateTimer = setTimeout(() => {
        navigate('/history2');
      }, 2000);
      
      return () => clearTimeout(navigateTimer);
    }
  }, [currentIndex, fullText.length, isTypingStarted, navigate]);

  // Blinking cursor - only starts after typing begins
  useEffect(() => {
    if (!isTypingStarted) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isTypingStarted]);

  // Calculate how much to move the image left as text types out
  // Move at the same pace as the text typing but over a shorter distance
  const maxShift = 25; // Move to left side when text is at max length
  
  let shift = 0;
  if (isTypingStarted) {
    // Calculate movement based on overall text progress with faster pace
    const movementProgress = Math.min(currentIndex / (fullText.length * 0.2), 1);
    shift = -movementProgress * maxShift; // Negative value to move left
  }

  // Update CSS custom property for the image movement
  useEffect(() => {
    document.documentElement.style.setProperty('--image-shift', `${shift}vw`);
  }, [shift]);

  return (
    <div className="animation-container">
      <button
        className="skip-button scary-skip"
        style={{
          position: 'fixed',
          top: 20,
          right: 30,
          zIndex: 2000,
          background: 'none',
          border: 'none',
          padding: 0,
          width: 'auto',
          height: 'auto',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (!isTextFilled) {
            // First click: fill all text
            setText(fullText);
            setCurrentIndex(fullText.length);
            setIsTypingStarted(true);
            setIsTextFilled(true);
          } else {
            // Second click: navigate to beginning of next page
            navigate('/history2');
          }
        }}
        aria-label="Skip animation"
      >
        <svg className="scary-skip-icon" width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="10,8 34,27 10,46" fill="#ff2222" filter="url(#glow)"/>
          <polygon points="26,8 50,27 26,46" fill="#ff2222" filter="url(#glow)"/>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </svg>
      </button>
      <img
        className="centered-image"
        src={mouthHandsImage}
        alt="Mouth Hands"
      />
      <div className="typing-overlay right">
        <span className="typing-text">
          {text}
          <span className={`cursor ${showCursor && isTypingStarted ? 'visible' : ''}`}>|</span>
        </span>
      </div>
    </div>
  );
}

export default Animation;
