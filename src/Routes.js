import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import ThreeTest from './pages/ThreeTest.js';

const Switchs = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/threeTest" element={<ThreeTest />} />
      </Routes>
    </Router>
  );
};

export default Switchs;
