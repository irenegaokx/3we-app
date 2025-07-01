import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import skullImage from '../assets/skull.png';
import skullBgImage from '../assets/skull_bg.png';
import groupedSkullsImage from '../assets/grouped_skulls.png';

function Home() {
  const text = "Those Who Wander May Enter";
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFlashlightActive, setIsFlashlightActive] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleKeyPress = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        setIsFlashlightActive(!isFlashlightActive);
      }
    };

    if (isFlashlightActive) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isFlashlightActive]);

  const flashlightStyle = {
    background: isFlashlightActive 
      ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, 
          rgba(0, 0, 0, 0) 0%, 
          rgba(0, 0, 0, 0) 40px, 
          rgba(0, 0, 0, 0.3) 60px, 
          rgba(0, 0, 0, 0.6) 90px, 
          rgba(0, 0, 0, 0.8) 120px, 
          rgba(0, 0, 0, 0.95) 150px, 
          rgba(0, 0, 0, 1) 100%)`
      : 'rgba(0, 0, 0, 1)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 1000,
    transition: isFlashlightActive ? 'background 0.05s ease-out' : 'none',
  };

  return (
    <div className="App-header">
      {/* Flashlight overlay */}
      <div style={flashlightStyle} />
      
      {/* Top grouped skulls */}
      <div className="grouped-skulls-top">
        <img 
          src={groupedSkullsImage} 
          alt="Grouped Skulls Top" 
          className="grouped-skulls-image"
        />
      </div>
      
      <div className="skull-container" style={{ position: 'relative' }}>
        <img 
          src={skullBgImage} 
          alt="Skull Background" 
          className="skull-bg-image"
        />
        <img 
          src={skullImage} 
          alt="Skull" 
          className="skull-image"
        />
        <svg className="mouth-svg" viewBox="0 0 1200 700">
          <defs>
            <path id="curve" d="M 100 500 Q 600 900 1100 500" fill="transparent" />
          </defs>
          <text width="1200" className="mouth-svg-text">
            <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
              {text}
            </textPath>
          </text>
        </svg>
        {/* Overlay clickable div */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '13%',
            width: '80%',
            height: '60%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            zIndex: 20,
            background: 'transparent',
          }}
          onClick={() => navigate('/history')}
        />
      </div>
      
      {/* Bottom grouped skulls */}
      <div className="grouped-skulls-bottom">
        <img 
          src={groupedSkullsImage} 
          alt="Grouped Skulls Bottom" 
          className="grouped-skulls-image"
        />
      </div>
      
      {/* Flashlight instructions */}
      <div className="flashlight-instructions">
        Press 'F' to toggle flashlight
      </div>
    </div>
  );
}

export default Home; 