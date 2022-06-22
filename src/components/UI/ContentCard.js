import React from "react";
import classes from "./UiCss/ContentCard.module.css";

const ContentCard = (props) => {
  return (
    <div className={classes.card} data-cy={props.cy}>
      <div>{props.svg}</div>
      <div className="sea-blue-divide"></div>
      <h3>{props.title}</h3>
      <div className="sea-blue-divide"></div>
      <p>{props.content}</p>
    </div>
  );
};

export default ContentCard;
