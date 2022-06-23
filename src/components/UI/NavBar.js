import { React, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import classes from "./UiCss/Navbar.module.css";

const NavBar = (props) => {
  const location = useLocation();
  let navContent;
  const activeStyle = classes.active;
  const navLinkStyle = classes.navlink;
  const [showNav, setShowNav] = useState(false);

  const showNavHandler = () => {
    setShowNav(!showNav);
  };

  navContent = (
    <nav
      className={
        showNav ? `${classes.navbar} ${classes.extend}` : classes.navbar
      }
    >
      <div className={classes.navlines} onClick={showNavHandler}>
        <div className={classes.navline}></div>
        <div className={classes.navline}></div>
        <div className={classes.navline}></div>
      </div>
      <ul>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? activeStyle : navLinkStyle
            }
          >
            <i className="fa-solid fa-house"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/vt"
            className={({ isActive }) =>
              isActive ? activeStyle : navLinkStyle
            }
            data-cy="vtnavlink"
          >
            <i className="fa-solid fa-credit-card"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/customer"
            className={({ isActive }) =>
              isActive ? activeStyle : navLinkStyle
            }
            data-cy="customernavlink"
          >
            <i className="fa-solid fa-people-group"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reporting"
            className={({ isActive }) =>
              isActive ? activeStyle : navLinkStyle
            }
            data-cy="reportingnavlink"
          >
            <i className="fa-solid fa-chart-column"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/invoice"
            className={({ isActive }) =>
              isActive ? activeStyle : navLinkStyle
            }
            data-cy="invoicenavlink"
          >
            <i className="fa-solid fa-envelope"></i>
          </NavLink>
        </li>
      </ul>
    </nav>
  );

  ///// check the path and set the navbar to disappear on the landing page ///////
  ////// Have different route paths for the customer facing stuff next time ///////
  if (location.pathname === "/") {
    navContent = <div></div>;
  }

  if (location.pathname.includes("/paymyinvoice")) {
    navContent = <div></div>;
  }

  return navContent;
};

export default NavBar;
