import React from "react";
import "./screen2a.css";
import { NavLink } from "react-bootstrap";
import Hamburger from "hamburger-react";
import { useState } from "react";
import Swal from "sweetalert2";
import NavItem from "./Navbar";

const Navbar = () => {
  // const [click, setClick] = React.useState(false);
  // const [dropdown, setDropdown] = useState(false);

  // const handleClick = () => setClick(!click);
  // const Close = () => setClick(false);

  return (
    <>
      <div>
        {/* <div
          // className={click ? "main-container" : ""}
          onClick={() => Close()}
        /> */}

        <NavItem />
        {/* <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            ParaDocs Health
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" onClick={clickDrop} href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Upload
        </a>
        <div class={dropdown ? "dropdown-menu " : "dropMenu"} aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Optum</a>
          <a class="dropdown-item" href="#" onClick={handle}>EMR</a>
        </div>
      </li>
            <li className="nav-item">
              <NavLink
                exact
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Welcome Muhammad !
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i><Hamburger/></i>
          </div>
        </div>
      </nav> */}
      </div>
    </>
  );
};

export default Navbar;
