import React, { useState, useEffect, useRef } from 'react';
import './new_animation2.css';
import movingcircleVideo from '../assets/new_animation/movingcircle.mp4';
import statuesImage from '../assets/new_animation/statues.png';
import flowersDoorImage from '../assets/new_animation/flowers_door.png';
import redCrossArrowImage from '../assets/new_animation/red_cross_arrow.png';

function NewAnimation2() {
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [statuesOpacity, setStatuesOpacity] = useState(0);
  const [flowersDoorOpacity, setFlowersDoorOpacity] = useState(0);
  const [clickToRevealOpacity, setClickToRevealOpacity] = useState(0);
  const [clickToRevealText, setClickToRevealText] = useState('');
  const [clickToRevealIndex, setClickToRevealIndex] = useState(0);
  const videoRef = useRef(null);
  
  const clickToRevealFullText = "Click to Reveal";

  // Video fade-in effect on component mount
  useEffect(() => {
    let progress = 0;
    const animationDuration = 3000; // 3 seconds for smooth fade-in
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(elapsed / animationDuration, 1);
      
      // Smooth easing function for natural fade-in
      const easeInOut = progress => {
        return progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      };
      
      const easedProgress = easeInOut(progress);
      
      // Calculate video opacity - fades from 0 to 1
      const opacity = easedProgress;
      
      setVideoOpacity(opacity);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  // Set video playback rate when video loads
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Play at half speed
    }
  }, [videoOpacity]);

  // Statues fade-in effect after video fade-in completes
  useEffect(() => {
    if (videoOpacity >= 0.99) { // When video fade-in is nearly complete
      setTimeout(() => {
        let progress = 0;
        const animationDuration = 4000; // 4 seconds for slow fade-in
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          progress = Math.min(elapsed / animationDuration, 1);
          
          // Smooth easing function for natural fade-in
          const easeInOut = progress => {
            return progress < 0.5 
              ? 2 * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          };
          
          const easedProgress = easeInOut(progress);
          
          // Calculate opacity - fades from 0 to 1 for both statues and flowers door
          const opacity = easedProgress;
          
          setStatuesOpacity(opacity);
          setFlowersDoorOpacity(opacity); // Both fade in at the same time
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Start click to reveal fade-in after statues and flowers door complete
            setTimeout(() => {
              setClickToRevealOpacity(1); // Show the section immediately
              
              // Start typing animation for text
              let textIndex = 0;
              const textInterval = setInterval(() => {
                if (textIndex < clickToRevealFullText.length) {
                  setClickToRevealText(clickToRevealFullText.substring(0, textIndex + 1));
                  textIndex++;
                } else {
                  clearInterval(textInterval);
                }
              }, 100); // Type each character every 100ms
              
            }, 500); // Wait 0.5 seconds after statues and flowers door fade-in completes
          }
        };
        
        requestAnimationFrame(animate);
      }, 500); // Wait 0.5 seconds after video fade-in completes
    }
  }, [videoOpacity]);

  return (
    <div className="new-animation2-container">
      {/* Movingcircle Video Background */}
      <div className="movingcircle-video-container">
        <video 
          className="movingcircle-video"
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ opacity: videoOpacity }}
          ref={videoRef}
        >
          <source src={movingcircleVideo} type="video/mp4" />
        </video>
      </div>

      {/* Statues Image Overlay */}
      <div className="statues-overlay">
        <img 
          src={statuesImage} 
          alt="Statues" 
          className="statues-image"
          style={{ opacity: statuesOpacity }}
        />
      </div>

      {/* Flowers Door Overlay */}
      <div className="flowers-door-overlay">
        <img 
          src={flowersDoorImage} 
          alt="Flowers Door" 
          className="flowers-door-image"
          style={{ opacity: flowersDoorOpacity }}
        />
      </div>

      {/* Click to Reveal Section */}
      <div className="click-to-reveal-section" style={{ opacity: clickToRevealOpacity }}>
        <div className="click-to-reveal-text">
          {clickToRevealText}
          <span className="cursor">|</span>
        </div>
        <div className="arrow-container">
          <img 
            src={redCrossArrowImage} 
            alt="Red Cross Arrow" 
            className="red-cross-arrow"
          />
        </div>
      </div>
    </div>
  );
}

export default NewAnimation2;
