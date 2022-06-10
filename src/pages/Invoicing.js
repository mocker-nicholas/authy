import React from "react";
import construction from "../img/under_construction.svg";
import classes from "./pages-css/Invoicing.module.css";

const Invoicing = () => {
  return (
    <section id="invoicing" className={classes.invoicing}>
      <h2>Coming Soon!</h2>
      <div className={classes.container}>
        <img src={construction}></img>
      </div>
      <p>Authy Invoicing is under construction and will up soon.</p>
      <p>Please check back periodically for updates!</p>
    </section>
  );
};

export default Invoicing;
