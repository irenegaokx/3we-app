import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './new_animation2.css';
import flowerDoorImage from '../assets/new_animation/flower_door.png';
import eliteCoinImage from '../assets/new_animation/elite_coin.png';

function NewAnimation2() {
  const navigate = useNavigate();
  const [doorSize, setDoorSize] = useState(35); // Default size in vw
  const [matrixColumns, setMatrixColumns] = useState([]);
  const [flashPosition, setFlashPosition] = useState(0);
  const [coinFloat, setCoinFloat] = useState(0); // For coin floating animation

  // Matrix characters for the digital rain effect
  const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ハロエ木トルリコИX<>-=:^~';

  const handleCoinClick = () => {
    navigate('/main_entry');
  };

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

  // Coin floating animation
  useEffect(() => {
    const floatInterval = setInterval(() => {
      setCoinFloat(prev => {
        const newFloat = prev + 0.1;
        return newFloat > Math.PI * 2 ? 0 : newFloat;
      });
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(floatInterval);
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

      {/* Main Flower Door Image with Elite Coin */}
      <div className="door-coin-container">
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
        <img 
          src={eliteCoinImage} 
          alt="Elite Coin" 
          className="elite-coin-image"
          style={{
            width: `${doorSize * 0.07}vw`,
            height: `${doorSize * 0.07}vw`,
            transition: 'all 0.1s ease-out',
            transform: `translate(-50%, -50%) translateY(${Math.sin(coinFloat) * 3}px)`,
            filter: `brightness(${1 + Math.sin(coinFloat * 2) * 0.1})`
          }}
          onClick={handleCoinClick}
        />
      </div>
    </div>
  );
}

export default NewAnimation2;
