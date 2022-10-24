import React from 'react';
import './about.css';

const About = () => {
    return (
        <div class="about-container">
            <h1 className="about-heading">
                About Health Visor
            </h1>

            <div className="about-cont">
                <p className="about-content1">
                    Health Visor is a Artificial Intelligence (AI) powered web-based application 
                    that allows you to easily view your health condition based on your symptoms.
                    Simply type in your symptoms, and we will find your health conditon. Regardless 
                    of
                    where you are, what condition you have, or your economic status, we will
                    give you your health conditon, steps to prevent the condition from worsening,
                    and the nearest doctors to you.
                </p>

                <p className="about-content2">
                    Our advanced Artificial Intelligence model was trained on over 600,000 data samples
                    of patient inputs, and tested on over 400,000 samples. Our models have an accuracy
                    of just over 99%, so our results are accurate.
                </p>

                <div className="disclaimer">
                    <h2 className="disclaimer-heading">Disclaimer</h2>
                    <p>
                        The Health Visor application does not track your data and 
                        only uses it for AI analysis. Additionally, dial 911 if you
                        have a life threatening emergency. 
                    </p>
                </div>
            </div>

        </div>
    );
};

export default About;