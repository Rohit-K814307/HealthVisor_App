import React from 'react';
import './home.css';
import Footer from '../../components/footer/Footer';
import Header from './header/Header';
import About from './about/About';

const Home = () => {
    return (
        <div class="container">

            <Header />

            <About />

            <Footer />
        </div>
    );
};

export default Home;