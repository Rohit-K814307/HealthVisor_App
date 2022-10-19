import React from 'react';
import './getstarted.css';
import Inputbox from './Inputbox';

const Getstarted = () => {
    return (
        <div className="getstarted-container">
            <div className="gs-header-bg">
                <h1 className="gs-header-text">Get Started with Health Visor</h1>
            </div>

            

            <div className="gs-whitespace">  </div>

            <div className="gs-funcs">
                <Inputbox />
            </div>
        </div>
    );
};

export default Getstarted;