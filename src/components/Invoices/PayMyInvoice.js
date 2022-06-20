import React from "react";
import { useParams } from "react-router-dom";
import { getInvoiceById, markAsPaid } from "../../lib/requests.js";
import { useState, useEffect } from "react";
import Loader from "../UI/Loader.js";
import ErrorBox from "../UI/ErrorBox.js";
import classes from "./InvoicesCss/PayMyInvoice.module.css";
import { getHostedToken } from "../../lib/requests.js";

const PayMyInvoice = (props) => {
  const params = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const resetToken = () => {
    markAsPaid(params.invoiceId);
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
      if (data.data[0]) {
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
    <section id="payyourinvoice" className={classes.invoice}>
      {loader && <Loader />}
      {error && <ErrorBox message={error.message} />}
      <div className={classes.invoiceContainer}>
        <div className={classes.top}></div>
        <h3>Invoice #: {invoice && invoice.invoice_number}</h3>
        <div className="sea-blue-divide"></div>
        <div className={classes.invoiceBlock}>
          <div className={classes.address}>
            <h4>Business User Inc.</h4>
            <p>123 Drury Lane</p>
            <p>Houston</p>
            <p>Texas</p>
            <p>99999</p>
          </div>
          <div className={classes.address}>
            <h4>
              Bill To: {invoice && `${invoice.first_name} ${invoice.last_name}`}
            </h4>
            <p>Billing Address: {invoice && invoice.address}</p>
            <p>City: {invoice && invoice.city}</p>
            <p>State: {invoice && invoice.state}</p>
            <p>Zip: {invoice && invoice.zip}</p>
          </div>
          <div className={classes.amount}>
            <h4 className={classes.due}>
              Amount Due:{" "}
              <span className={classes.total}>
                {invoice && parseFloat(invoice.amount).toFixed(2)}
              </span>
            </h4>
            <p>
              Status:{" "}
              <span
                className={
                  invoice && invoice.paid ? classes.paid : classes.outstanding
                }
              >
                {invoice && invoice && invoice.paid ? "Paid" : "Outstanding"}
              </span>
            </p>
          </div>
        </div>
        <div className="sea-blue-divide"></div>
        <div className={classes.description}>
          <h4>Job Description: </h4>
          <p>{invoice && invoice.job_description}</p>
        </div>
        {!token && (
          <button onClick={submitHandler} className="btn-sea-blue">
            Pay Invoice
          </button>
        )}
      </div>

      {token && (
        <form
          id="send_hptoken"
          action="https://test.authorize.net/payment/payment"
          method="post"
          target="load_payment"
          className={classes.authForm}
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
