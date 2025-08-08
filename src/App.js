import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './IntroPages/homepage';
import NewAnimation from './IntroPages/new_animation';
import NewAnimation2 from './IntroPages/new_animation2';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new_animation" element={<NewAnimation />} />
          <Route path="/new_animation2" element={<NewAnimation2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
