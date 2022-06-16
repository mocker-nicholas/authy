import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvoiceById, deleteInvoice } from "../../lib/requests.js";
import { useState, useEffect } from "react";
import Loader from "../UI/Loader.js";
import ErrorBox from "../UI/ErrorBox.js";
import classes from "./InvoicesCss/InvoiceDetail.module.css";

const InvoiceDetail = (props) => {
  const params = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const deleteHandler = async () => {
    setLoader(true);
    const response = await deleteInvoice(params.invoiceId);
    if (response.data.affectedRows) {
      setLoader(false);
      navigate("/invoicing");
    } else {
      console.log(response.data);
      setLoader(false);
    }
  };

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
  }, [params.invoiceId]);
  return (
    <section id="invoice" className={classes.invoiceDetail}>
      <header>
        <h2>Invoice #: {invoice && invoice.invoice_number}</h2>
        <div>
          <button className="btn-sea-blue">Update</button>
          <button onClick={deleteHandler} className="btn-dark-orange">
            Delete
          </button>
        </div>
        <p>
          Pay My invoice Link:{" "}
          {
            <a
              rel="noreferrer"
              target="_blank"
              href={`${window.location.origin}/paymyinvoice/${params.invoiceId}`}
            >{`${window.location.origin}/paymyinvoice/${params.invoiceId}`}</a>
          }
        </p>
      </header>
      {loader && <Loader />}
      {error && <ErrorBox message={error.message} />}
      <div className={classes.details}>
        <h3>
          Invoice #:{" "}
          <span className="sea-blue">{invoice && invoice.invoice_number}</span>
        </h3>
        <div className="sea-blue-divide"></div>
        <p>Description: {invoice && invoice.job_description}</p>
        <p>
          Amount Due:{" "}
          <span className={classes.outstanding}>
            {invoice && `$${parseFloat(invoice.amount).toFixed(2)}`}
          </span>
        </p>
        <p>
          Status:{" "}
          <span>{invoice && invoice.paid ? "Paid" : "Outstanding"}</span>
        </p>
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
