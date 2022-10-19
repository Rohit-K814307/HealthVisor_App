import React from 'react';
import './home.css';
import Footer from '../../components/footer/Footer';
import Header from './header/Header';
import About from './about/About';

const Home = () => {
    return (
        <div class="home-container">
            
            <div className="header-open">
                <Header />
            </div>

            <About />

        </div>
    );
};

export default Home;