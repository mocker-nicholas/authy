import React from "react";
import { useEffect, useState } from "react";
import { getInvoices } from "../lib/requests";
import { Link } from "react-router-dom";
import InvoiceRow from "../components/Invoices/InvoiceRow";
import ErrorBox from "../components/UI/ErrorBox";
import Loader from "../components/UI/Loader.js";
import classes from "./pages-css/Invoicing.module.css";

const Invoicing = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const data = await getInvoices();
      if (!data.data[0].error) {
        setInvoices(data.data);
        setLoader(false);
      } else {
        setError(data.data);
        setLoader(false);
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
      {loader && <Loader />}
      {error && <ErrorBox message={error.error} />}
      {invoices.length && (
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
      )}
    </section>
  );
};

export default Invoicing;
