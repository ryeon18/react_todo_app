import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Rotate from './pages/Rotate';
import ThreeTest from './pages/ThreeTest.js';

const Switchs = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/threeTest" element={<ThreeTest />} />
        <Route path="/rotate" element={<Rotate />} />
      </Routes>
    </Router>
  );
};

export default Switchs;
