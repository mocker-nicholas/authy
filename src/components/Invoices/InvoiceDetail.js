import React from "react";
import { useParams } from "react-router-dom";
import { getInvoiceById } from "../../lib/requests.js";
import { useState, useEffect } from "react";
import Loader from "../UI/Loader.js";
import ErrorBox from "../UI/ErrorBox.js";
import classes from "./InvoicesCss/InvoiceDetail.module.css";

const InvoiceDetail = (props) => {
  const params = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInvoice = async (id) => {
      setLoader(true);
      const data = await getInvoiceById(id);
      if (data.data[0].invoice_number) {
        setInvoice(data.data[0]);
        setLoader(false);
      } else {
        setError({ message: "Could not locate your invoice" });
        setLoader(false);
      }
    };

    getInvoice(params.invoiceId);
  }, []);
  console.log(invoice);

  return (
    <section id="invoice" className={classes.invoiceDetail}>
      <header>
        <h2>Invoice #: {invoice && invoice.invoice_number}</h2>
        <div>
          <button className="btn-sea-blue">Update</button>
          <button className="btn-dark-orange">Delete</button>
        </div>
        <p>
          Pay My invoice Link:{" "}
          {`http://localhost:3000/paymyinvoice/${params.invoiceId}`}
        </p>
      </header>
      {loader && <Loader />}
      {error && <ErrorBox message={error.message} />}
      <div className={classes.details}>
        <h3>Invoice #: {invoice && invoice.invoice_number}</h3>
        <div className="sea-blue-divide"></div>
        <p>Description: {invoice && invoice.job_description}</p>
        <p>Amount Due: {invoice && parseFloat(invoice.amount).toFixed(2)}</p>
        <p>Status: {invoice && invoice.paid ? "Paid" : "Outstanding"}</p>
        <p>Name: {invoice && `${invoice.first_name} ${invoice.last_name}`}</p>
        <p>Billing Address: {invoice && invoice.address}</p>
        <p>City: {invoice && invoice.city}</p>
        <p>State: {invoice && invoice.state}</p>
        <p>Zip: {invoice && invoice.zip}</p>
      </div>
    </section>
  );
};

export default InvoiceDetail;
