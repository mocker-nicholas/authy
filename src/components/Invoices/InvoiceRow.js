import React from "react";
import classes from "./InvoicesCss/InvoiceRow.module.css";
import { Link } from "react-router-dom";

const InvoiceRow = (props) => {
  const invoice = props.inv;
  return (
    <div className={classes.row}>
      <div className={`${classes.item} ${classes.number}`}>
        <p>
          <Link
            className={classes.link}
            to={`/invoice/${invoice.invoice_number}`}
          >
            {invoice.invoice_number}
          </Link>
        </p>
      </div>
      <div className={classes.item}>
        <p>{`${invoice.first_name} ${invoice.last_name}`}</p>
      </div>
      <div className={`${classes.item} ${classes.amount}`}>
        <p>${parseFloat(invoice.amount).toFixed(2)}</p>
      </div>
      <div className={classes.item}>
        <p>
          <span
            className={
              invoice.paid ? `${classes.paid}` : `${classes.outstanding}`
            }
          >
            {invoice.paid ? "Paid" : "Outstanding"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default InvoiceRow;
