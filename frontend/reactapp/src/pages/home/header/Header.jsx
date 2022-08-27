import React from 'react';
import './header.css';
import icon from './favicon.ico';
import { useNavigate } from "react-router-dom";

function Changetogetstarted() {

    let navigate = useNavigate(); 

    const routeChange = () => { 
        let path = `/get-started`; 
        navigate(path);
    };

    return(routeChange);
};

const Header = () => {
    return (
        <div className="healthvisor__header section__padding" id="home">
            <div className="healthvisor__header-content">

                <h1 className="gradient__text">Health Visor</h1>

                <div className="healthvisor__header-content__input">
                    <button onclick={Changetogetstarted()}
                    >
                        Get Started
                    </button>

                </div>

            </div>

            <div className="healthvisor__header-image">
                <img src={icon} alt="Healthvisor" />
            </div>

        </div>
    );
};
  
export default Header;