import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
import './navbar.css';
import home from './favicon.ico';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';

const Navbar = () => {
  return (
    <div class="navcontainer">

      <div class="space">
        
      </div>
      <Nav>
        <NavMenu>

          <div className="img-hv">
            <div className="img-hv-child">
              <h2 className="health">HealthVisor</h2>
              <h3 className="visor">AI Driven Health Platform</h3>
            </div>
          </div>

          <NavLink to="/" activeStyle>
            <div className="parent imag home">
              <div className="child">
                <HomeIcon />
              </div>
              <div className="child text">
                <p>Home</p>
              </div>
            </div>
          </NavLink>
          <NavLink to="/get-started" activeStyle>
            <div className="parent imag getstarted">
              <div className="child">
                <BarChartIcon />
              </div>
              <div className="child text">
                <p>Get Started</p>
              </div>
            </div>
          </NavLink>
        </NavMenu>
      </Nav>
    </div>
  );
};
    
export default Navbar;