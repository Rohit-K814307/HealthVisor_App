import React from 'react';
import './App.css';

import Navbar from './components/navbar/Navbar';

import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import {Getstarted,Home,Prediction_analysis}from './pages/index';

import Footer from './components/footer/Footer'
  
function App() {
  return (
    <div class="app-container">
      <Router>
        <Navbar />

        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/get-started' element={<Getstarted />} />
            <Route path='/prediction-analysis/:condition1/:confidence1/:condition2/:confidence2/:condition3/:confidence3/:state/:city' element={<Prediction_analysis />} />
        </Routes>

        <Footer />

      </Router>
      </div>
  );
};
  
export default App;
