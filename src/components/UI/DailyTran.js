import { React } from "react";
import classes from "./UiCss/DailyTran.module.css";

const DailyTran = (props) => {
  return (
    <section id="dailySummary" className={classes.summary}>
      <div className={classes.total}>
        Today's Total: <span>${props.todaysTotal}</span>
      </div>
      <div className="sea-blue-divide"></div>
      <div className={classes.total}>
        Previous Week: <span>${props.weekTotal}</span>
      </div>
      <div className="sea-blue-divide"></div>
    </section>
  );
};

export default DailyTran;
