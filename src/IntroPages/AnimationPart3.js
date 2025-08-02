import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AnimationPart3.css';
import skullWithCoinImage from '../assets/animation/skull_with_coin.png';
import redHandsImage from '../assets/animation/red_hands.PNG'
import handsUp from '../assets/animation/hands_up.PNG';

function AnimationPart3() {
  const location = useLocation();
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showRedHands, setShowRedHands] = useState(false);
  const [showHandsUp, setShowHandsUp] = useState(false);
  const [showMiddleHandsUp, setShowMiddleHandsUp] = useState(false);
  const [showOuterHandsUp, setShowOuterHandsUp] = useState(false);
  
  const fullText = "Then the Coin shall find you.\n\nNot given. Not earned. But summoned.\n\nAn echo of the Before. A sigil of refusal.\n\nA weapon forged from your withdrawal.\n\nAre you ready to hold the weapon? Y/N";

  // If skipToEnd is set, immediately fill in all text and start animation as finished
  useEffect(() => {
    if (location.state && location.state.skipToEnd) {
      setText(fullText);
      setCurrentIndex(fullText.length);
      setIsTypingStarted(true);
      setIsAnimationComplete(true);
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
    } else if (isTypingStarted && currentIndex >= fullText.length) {
      // Animation is complete
      setIsAnimationComplete(true);
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

  // Handle keyboard input when animation is complete
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isAnimationComplete) {
        if (event.key.toLowerCase() === 'y' && userInput === '') {
          setUserInput('Y');
          // Trigger red hands animation immediately
          setShowRedHands(true);
          // Trigger hands up animation after 0.5 seconds
          setTimeout(() => {
            setShowHandsUp(true);
          }, 500);
          // Trigger middle hands up animation after 1.25 seconds
          setTimeout(() => {
            setShowMiddleHandsUp(true);
          }, 1250);
          // Trigger outer hands up animation after 2 seconds
          setTimeout(() => {
            setShowOuterHandsUp(true);
          }, 2000);
        }
        if (event.key.toLowerCase() === 'n' && userInput === '') {
          setUserInput('N');
        }
      }
    };

    if (isAnimationComplete) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isAnimationComplete, userInput]);

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
          setIsAnimationComplete(true);
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
      
      {showRedHands && (
        <div className="red-hands-wrapper">
          <img
            className="red-hands-image"
            src={redHandsImage}
            alt="Red Hands"
          />
        </div>
      )}
      
      {showHandsUp && (
        <div className="hands-up-wrapper">
          <img
            className="hands-up-image left"
            src={handsUp}
            alt="Hands Up Left"
          />
          <img
            className="hands-up-image right"
            src={handsUp}
            alt="Hands Up Right"
          />
        </div>
      )}
      
      {showMiddleHandsUp && (
        <div className="middle-hands-up-wrapper">
          <img
            className="middle-hands-up-image left"
            src={handsUp}
            alt="Middle Hands Up Left"
          />
          <img
            className="middle-hands-up-image right"
            src={handsUp}
            alt="Middle Hands Up Right"
          />
        </div>
      )}
      
      {showOuterHandsUp && (
        <div className="outer-hands-up-wrapper">
          <img
            className="outer-hands-up-image left"
            src={handsUp}
            alt="Outer Hands Up Left"
          />
          <img
            className="outer-hands-up-image right"
            src={handsUp}
            alt="Outer Hands Up Right"
          />
        </div>
      )}
      
      <div className="typing-overlay right">
        <span className="typing-text">
          {text}
          {userInput && (
            <>
              {' '}
              <span className="user-input">{userInput}</span>
            </>
          )}
          {showCursor && isTypingStarted && text.length > 0 && !isAnimationComplete && (
            <span className="cursor visible">|</span>
          )}
          {isAnimationComplete && userInput === '' && (
            <span className="cursor visible">|</span>
          )}
        </span>
      </div>
    </div>
  );
}

export default AnimationPart3; 