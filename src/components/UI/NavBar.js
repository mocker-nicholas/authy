import { React } from "react";
import { useLocation, NavLink } from "react-router-dom";
import classes from "./UiCss/Navbar.module.css";

const NavBar = (props) => {
  const location = useLocation();
  let navContent;
  const activeStyle = classes.active;
  const navLinkStyle = classes.navlink;

  navContent = (
    <nav className={classes.navbar}>
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
          >
            <i className="fa-solid fa-credit-card"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              isActive ? activeStyle : navLinkStyle
            }
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
          >
            <i className="fa-solid fa-chart-column"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/invoicing"
            className={({ isActive }) =>
              isActive ? activeStyle : navLinkStyle
            }
          >
            <i class="fa-solid fa-envelope"></i>
          </NavLink>
        </li>
      </ul>
      <div className={classes.navlines}>
        <div className={classes.navline}></div>
        <div className={classes.navline}></div>
      </div>
    </nav>
  );

  ///// check the path and set the navbar to disappear on the landing page ///////
  if (location.pathname === "/") {
    navContent = <div></div>;
  }

  return navContent;
};

export default NavBar;
