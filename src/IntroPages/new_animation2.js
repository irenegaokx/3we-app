import React, { useState, useEffect } from 'react';
import './new_animation2.css';
import flowerDoorImage from '../assets/new_animation/flower_door.png';
import eyesVideo from '../assets/new_animation/eyes_moving.mp4';

function NewAnimation2() {
  const [doorSize, setDoorSize] = useState(35); // Default size in vw
  const [matrixColumns, setMatrixColumns] = useState([]);
  const [flashPosition, setFlashPosition] = useState(0);

  // Matrix characters for the digital rain effect
  const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ハロエ木トルリコИX<>-=:^~';

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
        setDoorSize(prevSize => Math.min(200, prevSize + 2));
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

  // Initialize matrix columns
  useEffect(() => {
    setMatrixColumns(generateMatrixColumns());
  }, []);

  // Matrix animation effect
  useEffect(() => {
    if (matrixColumns.length === 0) return;

    const animateMatrix = () => {
      setMatrixColumns(prevColumns => 
        prevColumns.map(column => ({
          ...column,
          chars: column.chars.map((char, index) => {
            // Randomly change characters (glitch effect)
            if (Math.random() < column.glitchChance) {
              return matrixChars[Math.floor(Math.random() * matrixChars.length)];
            }
            return char;
          })
        }))
      );
    };

    const interval = setInterval(animateMatrix, 200);
    return () => clearInterval(interval);
  }, [matrixColumns.length]);

  // Flash sweep animation
  useEffect(() => {
    const flashInterval = setInterval(() => {
      setFlashPosition(prev => {
        const newPosition = prev + 1;
        return newPosition > 100 ? 0 : newPosition;
      });
    }, 50); // Flash moves every 50ms

    return () => clearInterval(flashInterval);
  }, []);

  // Generate static Matrix columns
  const generateMatrixColumns = () => {
    const columns = [];
    const numColumns = Math.floor(window.innerWidth / 20); // 20px per column
    const numRows = Math.floor(window.innerHeight / 20); // 20px per row
    
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        id: i,
        x: i * 20,
        chars: Array.from({ length: numRows }, () => matrixChars[Math.floor(Math.random() * matrixChars.length)]),
        glitchChance: Math.random() * 0.1 // Random glitch probability
      });
    }
    return columns;
  };

  return (
    <div className="new-animation2-container">
      {/* Matrix Digital Rain Background */}
      <div className="matrix-background">
        {/* Flash sweep effect */}
        <div 
          className="flash-sweep"
          style={{
            top: `${flashPosition}%`
          }}
        />
        
        {matrixColumns.map(column => (
          <div
            key={column.id}
            className="matrix-column"
            style={{
              left: `${column.x}px`
            }}
          >
            {column.chars.map((char, index) => {
              const charPosition = (index / column.chars.length) * 100;
              const isInFlashZone = Math.abs(charPosition - flashPosition) < 5;
              
              return (
                <div
                  key={index}
                  className={`matrix-char ${isInFlashZone ? 'flash-highlight' : ''}`}
                >
                  {char}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Background Eyes Videos - 3 on left, 4 on right */}
      <div 
        className="background-eyes"
        style={{
          opacity: Math.max(0, 1 - (doorSize - 35) / 100),
          transition: 'opacity 0.2s ease-out'
        }}
      >
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
