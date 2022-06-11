import React from "react";
import classes from "./ReportingCss/DataRow.module.css";
import { Link } from "react-router-dom";

const DataRow = (props) => {
  const {
    transId,
    submitTimeUTC,
    firstName,
    lastName,
    settleAmount,
    transactionStatus,
  } = props.data;

  const date = new Date(submitTimeUTC).toLocaleString();

  return (
    <tr className={classes.row} id={transId}>
      <td className={classes.date}>{date}</td>
      <td>${settleAmount}</td>
      <td
        className={
          (transactionStatus === "Refund Pending" && "orange") ||
          (transactionStatus === "Refunded" && "orange") ||
          (transactionStatus === "Voided" && "red") ||
          (transactionStatus === "Declined" && "red") ||
          (transactionStatus === "Settled" && "green") ||
          (transactionStatus === "Pending Settlement" && "")
        }
      >
        {transactionStatus}
      </td>
      <td>{`${firstName} ${lastName}`}</td>
      <td>
        <Link to={`${transId}`} className={classes.info}>
          <i className="fa-solid fa-circle-info"></i>
        </Link>
      </td>
    </tr>
  );
};

export default DataRow;
