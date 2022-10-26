import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-content">

        <h3>HealthVisor</h3>

        <p>
          HealthVisor is an AI powered application that
          can easily find healthcare-related information about the population
          of a specific congressional district in the US. Thank you for visiting
          the site!
        </p>

        <div class="footer-bottom">
          <p>Made by <a href="https://www.linkedin.com/in/rohit-kulkarni-305a86202/">Rohit Kulkarni</a>  </p>
          <p>ⓒ Rohit Kulkarni 2022</p>
        </div>


      </div>
    </footer>
  );
};

export default Footer;