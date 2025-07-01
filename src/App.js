import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './IntroPages/HomePage';
import Animation from './IntroPages/Animation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<Animation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
