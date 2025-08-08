import React, { useState, useEffect } from 'react';
import './new_animation2.css';
import flowerDoorImage from '../assets/new_animation/flower_door.png';
import eyesVideo from '../assets/new_animation/eyes_moving.mp4';

function NewAnimation2() {
  const [doorSize, setDoorSize] = useState(35); // Default size in vw

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const scrollDelta = e.deltaY;
      
      // Adjust size based on scroll direction
      if (scrollDelta > 0) {
        // Scrolling down - make door smaller
        setDoorSize(prevSize => Math.max(10, prevSize - 2));
      } else {
        // Scrolling up - make door bigger
        setDoorSize(prevSize => Math.min(80, prevSize + 2));
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  return (
    <div className="new-animation2-container">
      {/* Background Eyes Videos - 3 on left, 4 on right */}
      <div className="background-eyes">
        {/* LEFT SIDE - 3 Eyes */}
        {/* Upper Left - Extra Large */}
        <div className="eye-video-container eye-extra-large eye-upper-left">
          <video 
            className="eyes-video-instance"
            autoPlay 
            loop 
            muted 
            playsInline
            ref={(el) => {
              if (el) {
                el.currentTime = 0;
              }
            }}
          >
            <source src={eyesVideo} type="video/mp4" />
          </video>
        </div>
        
        {/* Upper Left - Medium */}
        <div className="eye-video-container eye-medium eye-upper-left-2">
          <video 
            className="eyes-video-instance"
            autoPlay 
            loop 
            muted 
            playsInline
            ref={(el) => {
              if (el) {
                el.currentTime = 1.5;
              }
            }}
          >
            <source src={eyesVideo} type="video/mp4" />
          </video>
        </div>

        {/* Middle Left - Large */}
        <div className="eye-video-container eye-large eye-middle-left">
          <video 
            className="eyes-video-instance"
            autoPlay 
            loop 
            muted 
            playsInline
            ref={(el) => {
              if (el) {
                el.currentTime = 0.8;
              }
            }}
          >
            <source src={eyesVideo} type="video/mp4" />
          </video>
        </div>

        {/* RIGHT SIDE - 4 Eyes */}
        {/* Upper Right - Large */}
        <div className="eye-video-container eye-large eye-upper-right">
          <video 
            className="eyes-video-instance"
            autoPlay 
            loop 
            muted 
            playsInline
            ref={(el) => {
              if (el) {
                el.currentTime = 2.2;
              }
            }}
          >
            <source src={eyesVideo} type="video/mp4" />
          </video>
        </div>

        {/* Upper Right - Medium */}
        <div className="eye-video-container eye-medium eye-upper-right-2">
          <video 
            className="eyes-video-instance"
            autoPlay 
            loop 
            muted 
            playsInline
            ref={(el) => {
              if (el) {
                el.currentTime = 3.1;
              }
            }}
          >
            <source src={eyesVideo} type="video/mp4" />
          </video>
        </div>

        {/* Middle Right - Medium */}
        <div className="eye-video-container eye-medium eye-middle-right">
          <video 
            className="eyes-video-instance"
            autoPlay 
            loop 
            muted 
            playsInline
            ref={(el) => {
              if (el) {
                el.currentTime = 1.8;
              }
            }}
          >
            <source src={eyesVideo} type="video/mp4" />
          </video>
        </div>

        {/* Lower Right - Small */}
        <div className="eye-video-container eye-small eye-lower-right">
          <video 
            className="eyes-video-instance"
            autoPlay 
            loop 
            muted 
            playsInline
            ref={(el) => {
              if (el) {
                el.currentTime = 2.7;
              }
            }}
          >
            <source src={eyesVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Main Flower Door Image */}
      <img 
        src={flowerDoorImage} 
        alt="Flower Door with Coin" 
        className="flower-door-image"
        style={{
          maxWidth: `${doorSize}vw`,
          maxHeight: `${doorSize * 0.7}vh`,
          transition: 'all 0.1s ease-out'
        }}
      />
    </div>
  );
}

export default NewAnimation2;
