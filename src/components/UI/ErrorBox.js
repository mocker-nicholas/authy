import React from "react";
import { Link } from "react-router-dom";

import classes from "./UiCss/ErrorBox.module.css";

const ErrorBox = (props) => {
  return (
    <div className={classes.errorBox}>
      <header>Sorry about that...</header>
      <div>
        <p>{props.message}</p>
      </div>
      <div className={classes.button}>
        <Link to="/home" className="btn-dark-blue">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorBox;
