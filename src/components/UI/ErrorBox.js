import React from "react";
import { Link } from "react-router-dom";

import classes from "./UiCss/ErrorBox.module.css";

const ErrorBox = (props) => {
  return (
    <div className={classes.errorBox}>
      <header>
        <p>Sorry about that...</p>
      </header>
      <div>
        <p className={classes.message}>{props.message}</p>
      </div>
      <div className={classes.button}>
        {!props.clear && (
          <Link to="/home" className="btn-dark-blue">
            Go Back
          </Link>
        )}
        {props.clear && (
          <button className="btn-dark-blue" onClick={props.clear}>
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBox;
