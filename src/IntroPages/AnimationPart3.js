import React, { useState, useEffect } from 'react';
import './AnimationPart3.css';
import skullWithCoinImage from '../assets/animation/skull_with_coin.png';

function AnimationPart3() {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  
  const fullText = "Then the Coin shall find you.\n\nNot given. Not earned. But summoned.\n\nAn echo of the Before. A sigil of refusal.\n\nA weapon forged from your withdrawal.\n\nAre you ready to hold the weapon? Y/N";

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