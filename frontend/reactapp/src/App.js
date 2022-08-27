import React from 'react';
import './App.css';

import Navbar from './components/navbar/Navbar';

import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import {Getstarted,Home}from './pages/index';
  
function App() {
  return (
      <Router>
        <Navbar />

        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/get-started' element={<Getstarted/>} />
        </Routes>

      </Router>
  );
};
  
export default App;
