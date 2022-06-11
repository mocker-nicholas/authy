import React from "react";
import classes from "./UiCss/Loader.module.css";

const Loader = (props) => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.loader}></div>
    </div>
  );
};

export default Loader;
