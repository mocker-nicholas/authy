import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { getTransactionById } from "../../lib/requests";
import classes from "./ReportingCss/TransactionDetail.module.css";

const TransactionDetail = (props) => {
  const [trans, setTrans] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getTranData = async (id) => {
      const response = await getTransactionById(id);
      setTrans(response.data);
    };

    getTranData(params.transactionId);
  }, [params]);

  console.log(trans);
  return (
    <section id="transaction-detail" className={classes.detail}>
      {trans && (
        <React.Fragment>
          <div className={classes.primary}>
            <h3>
              Amount:{" "}
              <span className={classes.seaBlue}>{trans.authAmount}</span>
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
