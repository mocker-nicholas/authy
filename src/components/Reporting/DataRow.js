import React from "react";
import classes from "./ReportingCss/DataRow.module.css";

const DataRow = (props) => {
  const { transId } = props.data;

  return (
    <div className={classes.row} id={transId}>
      <div></div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  );
};

export default DataRow;
