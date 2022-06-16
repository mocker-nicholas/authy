import React from "react";
import classes from "./InvoicesCss/InvoiceRow.module.css";
import { Link } from "react-router-dom";

const InvoiceRow = (props) => {
  const invoice = props.inv;
  return (
    <div className={classes.row}>
      <div className={classes.item}>
        <Link
          className={classes.link}
          to={`/invoicing/${invoice.invoice_number}`}
        >
          {invoice.invoice_number}
        </Link>
      </div>
      <div
        className={classes.item}
      >{`${invoice.first_name} ${invoice.last_name}`}</div>
      <div className={classes.item}>${invoice.amount}</div>
      <div className={classes.item}>
        <span
          className={
            invoice.paid ? `${classes.paid}` : `${classes.outstanding}`
          }
        >
          {invoice.paid ? "Paid" : "Outstanding"}
        </span>
      </div>
    </div>
  );
};

export default InvoiceRow;
