import React from "react";
import classes from "./UiCss/Footer.module.css";

const Footer = (props) => {
  return (
    <footer className={classes.footer}>
      <div>
        <p className={classes.logo}></p>
      </div>
      <div className={classes.tech}></div>
      <div className={classes.contact}></div>
    </footer>
  );
};

export default Footer;
