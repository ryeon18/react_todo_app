import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './Main';
import ThreeTest from './ThreeTest.js';

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
