import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './new_animation.css';
import redWindowImage from '../assets/new_animation/red_window.png';
import eyesVideo from '../assets/new_animation/eyes_moving.mp4';


function NewAnimation() {
  const navigate = useNavigate();
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [leftShift, setLeftShift] = useState(-30);
  const [rightShift, setRightShift] = useState(-30);
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isMovingToCenter, setIsMovingToCenter] = useState(false);
  const [textShift, setTextShift] = useState(0);
  
  const fullText = "The quest for peace and wisdom was fractured, scattered through waves of irony, absurdity, and noise, as the algorithm patterns it was trained to distort.\n\nA signal emerged out of this war for the psyche. And a network of seekers, united not by chance, but by a shared frequency and vision.\n\nA vision bound them those who search relentlessly, drawn toward the hidden architecture of truth.\n\nThey are known as the Elite Network";

  // Start animation immediately
  useEffect(() => {
    setIsAnimationStarted(true);
  }, []);

  // Animate windows smoothly sliding into position with shaking
  useEffect(() => {
    if (isAnimationStarted) {
      let progress = 0;
      const animationDuration = 3500; // 3.5 seconds - slower movement
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / animationDuration, 1);
        
        // Smooth linear movement from off-screen to final position
        const leftPosition = -30 + (35 * progress);
        const rightPosition = -30 + (35 * progress);
        
        setLeftShift(leftPosition);
        setRightShift(rightPosition);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Animation complete
          setLeftShift(5);
          setRightShift(5);
          setIsAnimationComplete(true);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isAnimationStarted]);

  // Update CSS custom properties for window movement
  useEffect(() => {
    document.documentElement.style.setProperty('--left-window-shift', `${leftShift}vw`);
    document.documentElement.style.setProperty('--right-window-shift', `${rightShift}vw`);
    document.documentElement.style.setProperty('--text-shift', `${textShift}vw`);
  }, [leftShift, rightShift, textShift]);

  // Start typing after windows reach their position
  useEffect(() => {
    if (isAnimationComplete) {
      const typingDelay = setTimeout(() => {
        setIsTypingStarted(true);
      }, 300); // Reduced from 1000ms to 300ms
      
      return () => clearTimeout(typingDelay);
    }
  }, [isAnimationComplete]);

  // Typing effect
  useEffect(() => {
    if (isTypingStarted && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 60); // Reduced from 120ms to 60ms
      return () => clearTimeout(timeout);
    } else if (isTypingStarted && currentIndex >= fullText.length) {
      // Typing is complete
      setIsTypingComplete(true);
    }
  }, [currentIndex, fullText, isTypingStarted]);

  // Move windows to center after typing is complete
  useEffect(() => {
    if (isTypingComplete && !isMovingToCenter) {
      const moveDelay = setTimeout(() => {
        setIsMovingToCenter(true);
        
        let progress = 0;
        const animationDuration = 4000; // 4 seconds for slow movement
        const startTime = Date.now();
        
        // Calculate target positions
        // Right window should end at center (50vw), so it needs to move from 5vw to 50vw = 45vw movement
        // Left window moves the same distance: from 5vw to -40vw (5vw - 45vw)
        // Text moves the same distance: from 0vw to -45vw
        const rightTargetPosition = 50; // center of screen
        const leftTargetPosition = -40; // left window moves left by same amount
        const textTargetPosition = -45; // text moves left by same amount
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          progress = Math.min(elapsed / animationDuration, 1);
          
          // Smooth easing function for natural movement
          const easeInOut = progress => {
            return progress < 0.5 
              ? 2 * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          };
          
          const easedProgress = easeInOut(progress);
          
          // Calculate new positions
          const leftPosition = 5 + (leftTargetPosition - 5) * easedProgress;
          const rightPosition = 5 + (rightTargetPosition - 5) * easedProgress;
          const textPosition = 0 + (textTargetPosition - 0) * easedProgress;
          
          setLeftShift(leftPosition);
          setRightShift(rightPosition);
          setTextShift(textPosition);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }, 1000); // Wait 1 second after typing completes
      
      return () => clearTimeout(moveDelay);
    }
  }, [isTypingComplete, isMovingToCenter]);

  // Blinking cursor
  useEffect(() => {
    if (!isTypingStarted) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isTypingStarted]);

  return (
    <div className="new-animation-container">
      {/* Skip Button */}
      <button
        className="skip-button scary-skip"
        style={{
          position: 'fixed',
          top: 100,
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
          if (!isTypingComplete) {
            // First click: complete typing immediately
            setText(fullText);
            setCurrentIndex(fullText.length);
            setIsTypingStarted(true);
            setIsTypingComplete(true);
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

      {/* Eyes Video Strip at Top */}
      <div className="eyes-video-strip top">
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
      </div>

      {/* Eyes Video Strip at Bottom */}
      <div className="eyes-video-strip bottom">
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
        <video 
          className="eyes-video-instance"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={eyesVideo} type="video/mp4" />
        </video>
      </div>

      {/* Left Window */}
      <img
        className={`left-window ${isAnimationStarted && !isAnimationComplete ? 'slide-in' : ''}`}
        src={redWindowImage}
        alt="Left Window"
      />

      {/* Right Window */}
      <img
        className={`right-window ${isAnimationStarted && !isAnimationComplete ? 'slide-in' : ''}`}
        src={redWindowImage}
        alt="Right Window"
      />

      {/* Typing Text Overlay */}
      <div className="typing-overlay">
        <span className="typing-text">
          {text}
          <span className={`cursor ${showCursor && isTypingStarted ? 'visible' : ''}`}>|</span>
        </span>
      </div>


    </div>
  );
}

export default NewAnimation;
