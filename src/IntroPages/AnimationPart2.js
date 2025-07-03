import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimationPart2.css';
import prayingGodImage from '../assets/animation/praying_god.png';

function AnimationPart2() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [isTextFilled, setIsTextFilled] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  
  const fullText = "In shadowed circuits and silent rooms, a new Order stirred.\n\nNot with noise, but with knowing. Not with light, but with fire.\n\nThe Rite of Severance thus begins…";

  // Show the praying god image after a brief delay
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(showTimer);
  }, []);

  // Start typing effect after 3 seconds
  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTypingStarted(true);
    }, 3000);
    
    return () => clearTimeout(typingTimer);
  }, []);

  // Typing effect - only starts after the delay
  useEffect(() => {
    if (isTypingStarted && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 60);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText, isTypingStarted]);

  // Navigate to history3 after typing is complete
  useEffect(() => {
    if (isTypingStarted && currentIndex >= fullText.length) {
      const navigateTimer = setTimeout(() => {
        navigate('/history3');
      }, 2000);
      
      return () => clearTimeout(navigateTimer);
    }
  }, [currentIndex, fullText.length, isTypingStarted, navigate]);

  // Blinking cursor - only starts after typing begins and there's text
  useEffect(() => {
    if (!isTypingStarted || text.length === 0) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isTypingStarted, text.length]);

  return (
    <div className="animation-part2-container">
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
            navigate('/history3');
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
      {isVisible && (
        <div className="image-wrapper">
          <img
            className={`praying-god-image ${isTextFilled ? 'zoomed-in' : ''}`}
            src={prayingGodImage}
            alt="Praying God"
          />
        </div>
      )}
      <div className="typing-overlay">
        <span className="typing-text">
          {text}
          {showCursor && isTypingStarted && text.length > 0 && (
            <span className="cursor visible">|</span>
          )}
        </span>
      </div>
    </div>
  );
}

export default AnimationPart2; 