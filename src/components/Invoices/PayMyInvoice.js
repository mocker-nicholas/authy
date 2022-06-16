import React from "react";
import { useParams } from "react-router-dom";
import { getInvoiceById } from "../../lib/requests.js";
import { useState, useEffect } from "react";
import Loader from "../UI/Loader.js";
import ErrorBox from "../UI/ErrorBox.js";
import classes from "./InvoicesCss/InvoiceDetail.module.css";
import { getHostedToken } from "../../lib/requests.js";

const PayMyInvoice = (props) => {
  const params = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const resetToken = () => {
    setTimeout(() => {
      setToken(null);
    }, 3000);
  };

  const submitHandler = async (e) => {
    setLoader(true);
    const response = await getHostedToken({
      first: { value: invoice.first_name },
      last: { value: invoice.last_name },
      company: { value: "" },
      street: { value: invoice.address },
      city: { value: invoice.city },
      state: { value: invoice.state },
      zip: { value: invoice.zip },
      country: { value: "" },
      amount: { value: invoice.amount },
    });
    setToken(response.data.token);
    setLoader(false);
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
  console.log(invoice);

  return (
    <section id="payyourinvoice" className={classes.invoiceDetail}>
      {loader && <Loader />}
      {error && <ErrorBox message={error.message} />}
      <div className={classes.details}>
        <h3>Invoice #: {invoice && invoice.invoice_number}</h3>
        <div className="sea-blue-divide"></div>
        <p>Description: {invoice && invoice.job_description}</p>
        <p>Amount Due: {invoice && parseFloat(invoice.amount).toFixed(2)}</p>
        <p>
          Status:{" "}
          <span>{invoice && invoice.paid ? "Paid" : "Outstanding"}</span>
        </p>
        <p>Name: {invoice && `${invoice.first_name} ${invoice.last_name}`}</p>
        <p>Billing Address: {invoice && invoice.address}</p>
        <p>City: {invoice && invoice.city}</p>
        <p>State: {invoice && invoice.state}</p>
        <p>Zip: {invoice && invoice.zip}</p>
        <button onClick={submitHandler} className="btn-sea-blue">
          Submit Payment
        </button>
      </div>
      {token && (
        <form
          id="send_hptoken"
          action="https://test.authorize.net/payment/payment"
          method="post"
          target="load_payment"
        >
          <input type="hidden" name="token" value={token} />
          <div>
            <p>
              Everything looks good! Please proceed to the Authorize.net secure
              payments page below to complete your payment.
            </p>
          </div>
          <button className="btn-dark-orange" onClick={resetToken}>
            {" "}
            Proceed To Payment
          </button>
        </form>
      )}
    </section>
  );
};

export default PayMyInvoice;
