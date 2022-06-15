import React from "react";
import { useEffect, useState } from "react";
import { getInvoices } from "../lib/requests";
import { Link } from "react-router-dom";
import InvoiceRow from "../components/Invoices/InvoiceRow";
import classes from "./pages-css/Invoicing.module.css";

const Invoicing = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getInvoices();
      if (!data.data[0].error) {
        setInvoices(data.data);
      } else {
        setError(data.data);
      }
    };

    getData();
  }, []);

  return (
    <section id="invoicing" className={classes.invoicing}>
      <header>
        <h2>Current Invoices</h2>
        <Link to="create" className="btn-dark-orange">
          Create
        </Link>
      </header>
      <div className={classes.invoiceTable}>
        <div className={classes.tableHead}>
          <div className={classes.label}>Invoice #</div>
          <div className={classes.label}>Name</div>
          <div className={classes.label}>Amount</div>
          <div className={classes.label}>Status</div>
        </div>
        {invoices &&
          invoices.map((inv) => {
            return <InvoiceRow key={inv.invoice_number} inv={inv} />;
          })}
      </div>
    </section>
  );
};

export default Invoicing;
