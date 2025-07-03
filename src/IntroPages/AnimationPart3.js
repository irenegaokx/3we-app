import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AnimationPart3.css';
import skullWithCoinImage from '../assets/animation/skull_with_coin.png';

function AnimationPart3() {
  const location = useLocation();
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  
  const fullText = "Then the Coin shall find you.\n\nNot given. Not earned. But summoned.\n\nAn echo of the Before. A sigil of refusal.\n\nA weapon forged from your withdrawal.\n\nAre you ready to hold the weapon? Y/N";

  // If skipToEnd is set, immediately fill in all text and start animation as finished
  useEffect(() => {
    if (location.state && location.state.skipToEnd) {
      setText(fullText);
      setCurrentIndex(fullText.length);
      setIsTypingStarted(true);
    }
  }, [location.state, fullText]);

  // Start typing effect after 2 seconds
  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTypingStarted(true);
    }, 500);
    
    return () => clearTimeout(typingTimer);
  }, []);

  // Typing effect - only starts after the delay
  useEffect(() => {
    if (isTypingStarted && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText, isTypingStarted]);

  // Blinking cursor - only starts after typing begins and there's text
  useEffect(() => {
    if (!isTypingStarted || text.length === 0) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isTypingStarted, text.length]);

  return (
    <div className="animation-part3-container">
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
          setText(fullText);
          setCurrentIndex(fullText.length);
          setIsTypingStarted(true);
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
      <div className="left-image-wrapper">
        <img
          className="skull-with-coin-image"
          src={skullWithCoinImage}
          alt="Skull with Coin"
        />
        <div className="coin-overlay"></div>
      </div>
      <div className="typing-overlay right">
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

export default AnimationPart3; 