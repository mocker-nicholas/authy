import { useEffect, useState } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTransactionById,
  voidTransaction,
  refundTransaction,
} from "../../lib/requests";
import classes from "./ReportingCss/TransactionDetail.module.css";
import Loader from "../UI/Loader";
import ErrorBox from "../UI/ErrorBox";

const TransactionDetail = (props) => {
  const [trans, setTrans] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const voidTransHandler = async () => {
    setLoader(true);
    const response = await voidTransaction(params.transactionId);
    if (response.data.messages.resultCode === "Ok") {
      navigate(`/reporting/${params.transactionId}`);
      setLoader(false);
    } else {
      setError({ message: "Uknown error: Unable to void transaction" });
    }
  };

  const refundTransHandler = async () => {
    setLoader(true);
    const response = await refundTransaction({
      id: params.transactionId,
      amount: trans.settleAmount,
      cardNumber: trans.payment.creditCard.cardNumber,
    });
    console.log(response.data);
    if (response.data.transactionResponse.responseCode === "1") {
      navigate(`/reporting/${response.data.transactionResponse.transId}`);
      setLoader(false);
    } else {
      setError({
        message: response.data.transactionResponse.errors[0].errorText,
      });
      setLoader(false);
    }
  };

  useEffect(() => {
    const getTranData = async (id) => {
      setLoader(true);
      const response = await getTransactionById(id);
      if (response.data.error) {
        setLoader(false);
        setError({ message: response.data.error });
      } else {
        setTrans(response.data);
        setLoader(false);
      }
    };

    getTranData(params.transactionId);
  }, [params]);

  return (
    <section id="transaction-detail" className={classes.detail}>
      {loader && <Loader />}
      <div className={classes.errorContainer}>
        {error && <ErrorBox message={error.message} path="/reporting" />}
      </div>
      {trans && (
        <React.Fragment>
          <div className={classes.primary}>
            <h3>
              Amount:{" "}
              <span className={classes.seaBlue}>
                {parseFloat(trans.authAmount).toFixed(2)}
              </span>
            </h3>
            <p>
              Status:{" "}
              <span
                className={
                  (trans.transactionStatus === "Refund Pending" && "orange") ||
                  (trans.transactionStatus === "Refunded" && "orange") ||
                  (trans.transactionStatus === "Voided" && "red") ||
                  (trans.transactionStatus === "Declined" && "red") ||
                  (trans.transactionStatus === "Settled" && "green") ||
                  (trans.transactionStatus === "Pending Settlement" && "")
                }
              >
                {trans.transactionStatus}
              </span>
            </p>
            <p className={classes.small}>
              Response: {trans.responseReasonDescription}
            </p>
            {trans.transactionStatus === "Settled" && (
              <button onClick={refundTransHandler} className="btn-dark-orange">
                Refund
              </button>
            )}
            {trans.transactionStatus === "Pending Settlement" && (
              <button onClick={voidTransHandler} className="btn-dark-orange">
                Void
              </button>
            )}
            {trans.transactionStatus === "Refund Pending" && (
              <button onClick={voidTransHandler} className="btn-dark-orange">
                Void
              </button>
            )}
          </div>
          <div className={`${classes.primary}`}>
            <h4>Transaction Details:</h4>
            <p>
              Transaction Id:{" "}
              <span className={classes.seaBlue}>{trans.transId}</span>
            </p>
            <p>
              Date:{" "}
              <span>{new Date(trans.submitTimeUTC).toLocaleString()}</span>
            </p>
            <p>
              Transaction Type: <span>{trans.transactionType}</span>
            </p>
            <h4>Payment Details:</h4>
            <p>
              Card Type: <span>{trans.payment.creditCard.cardType}</span>
            </p>
            <p>
              Masked Account: <span>{trans.payment.creditCard.cardNumber}</span>
            </p>
            <p>
              AVS Response: <span>{trans.AVSResponse}</span>
            </p>
            <h4>Billing Info:</h4>
            <p>
              First Name: <span>{trans.billTo.firstName}</span>
            </p>
            <p>
              Last Name: <span>{trans.billTo.lastName}</span>
            </p>
            <p>
              Company: <span>{trans.billTo.company}</span>
            </p>
            <p>
              Address: <span>{trans.billTo.address}</span>
            </p>
            <p>
              City: <span>{trans.billTo.city}</span>
            </p>
            <p>
              State: <span>{trans.billTo.state}</span>
            </p>
            <p>
              Zip code: <span>{trans.billTo.zip}</span>
            </p>
          </div>
        </React.Fragment>
      )}
      <div className="spacer"></div>
    </section>
  );
};
export default TransactionDetail;
