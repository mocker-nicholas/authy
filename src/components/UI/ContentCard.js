import React from "react";
import classes from "./UiCss/ContentCard.module.css"

const ContentCard = (props) => {
  return <div className={classes.card}>
    <div>
      <img src={props.src}>
      </img>
    </div>
    <h3>{props.title}</h3>
    <p>{props.content}</p>
  </div>
}

export default ContentCard;