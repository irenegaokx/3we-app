import React, { useState, useEffect } from 'react';
import './AnimationPart2.css';
import prayingGodImage from '../assets/animation/praying_god.png';

function AnimationPart2() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the praying god image after a brief delay
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(showTimer);
  }, []);

  return (
    <div className="animation-part2-container">
      {isVisible && (
        <img
          className="praying-god-image"
          src={prayingGodImage}
          alt="Praying God"
        />
      )}
    </div>
  );
}

export default AnimationPart2; 