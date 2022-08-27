import React from 'react';
import './getstarted.css';
import Footer from '../../components/footer/Footer';

const Getstarted = () => {
    return (
        <div class="container">
            <div class="getstarted-content">
                
                <div class="headerbox">
                    <h1 class="header">Get Started with Heath Visor</h1>
                </div>

                <div class="functionality-content">
                    <p class="inplace_of_functionality">
                        This is inplace of the functionality;
                        we first check if the user is logged in, then if we are, we get started,
                        otherwise we redirect to the sign in page

                        Add some kind of button and then expanding menu that
                        contains a bunch of tabs and stuff for the ai 
                        analysis as well as the data and everything
                    </p>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Getstarted;