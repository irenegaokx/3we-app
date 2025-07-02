import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Animation.css';
import mouthHandsImage from '../assets/animation/mouth_hands.png';

function Animation() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
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
