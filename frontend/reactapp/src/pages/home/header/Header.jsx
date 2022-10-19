import React from 'react';
import './header.css';
import icon from './favicon.ico';

const Header = () => {

    const getStarted = () => {
        window.location.href = "http://localhost:3000/get-started";
    }
    return (
        <div className="healthvisor-header">

            <h1 className="main-text">Prevent. Protect. Connect.</h1>
            
            <dev className="ref">
                <p className="ref-text">Diagnose a sickness, get simple and straightforward steps, and find the nearest doctors to you.</p>
                <p className="ref-text">Health Visor.</p>
            </dev>

            <div className="button-cont">
                <button type="button" className="button" onClick={getStarted}>
                    Get Started
                </button>
            </div>



        </div>
    );
};
  
export default Header;