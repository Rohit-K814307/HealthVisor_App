import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
import './navbar.css';
import home from './favicon.ico';

const Navbar = () => {
  return (
    <div class="navcontainer">

      <div class="space">
        
      </div>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            <img class="homeimg" src={home} alt="home" />
          </NavLink>
          <NavLink to="/get-started" activeStyle>
            Get Started With Health Visor
          </NavLink>
        </NavMenu>
      </Nav>
    </div>
  );
};
    
export default Navbar;