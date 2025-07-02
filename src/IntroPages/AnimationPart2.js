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
      {isVisible && (
        <div className="image-wrapper">
          <img
            className="praying-god-image"
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