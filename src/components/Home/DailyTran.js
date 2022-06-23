import { React } from "react";
import classes from "./HomeCss/DailyTran.module.css";

const DailyTran = (props) => {
  return (
    <section id="dailySummary" className={classes.summary}>
      <div className={classes.total} data-cy="total-1">
        Previous Week: <p>${props.weekTotal}</p>
      </div>
      <div className={`sea-blue-divide ${classes.hide}`}></div>
      <div className={classes.total} data-cy="total-2">
        Pending Total: <p>${props.todaysTotal}</p>
      </div>
      <div className={`sea-blue-divide ${classes.hide}`}></div>
      <div className={classes.total} data-cy="total-3">
        Pending Transactions: <p>{props.todaysNum}</p>
      </div>
      <div className={`sea-blue-divide ${classes.hide}`}></div>
    </section>
  );
};

export default DailyTran;
