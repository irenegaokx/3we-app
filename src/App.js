import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './IntroPages/homepage';
import Animation from './IntroPages/Animation';
import AnimationPart2 from './IntroPages/AnimationPart2';
import AnimationPart3 from './IntroPages/AnimationPart3';
import NewAnimation from './IntroPages/new_animation';
import NewAnimation2 from './IntroPages/new_animation2';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<Animation />} />
          <Route path="/history2" element={<AnimationPart2 />} />
          <Route path="/history3" element={<AnimationPart3 />} />
          <Route path="/new_animation" element={<NewAnimation />} />
          <Route path="/new_animation2" element={<NewAnimation2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
