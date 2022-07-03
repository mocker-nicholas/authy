import { React, useEffect, useState } from "react";
import classes from "./CustomersCss/CustomerDetail.module.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  getACustomer,
  chargeCustomer,
  deleteCustomer,
} from "../../lib/requests";
import Loader from "../UI/Loader";
import ErrorBox from "../UI/ErrorBox";

const CustomerDetail = (props) => {
  const [profile, setProfile] = useState(null);
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState({ value: "0.00", error: "" });
  const navigate = useNavigate();

  const onBlurHandler = (e) => {
    const value = e.target.value;
    if (value === "") {
      setAmount((state) => {
        return {
          value: "0.00",
          error: state.error,
        };
      });
    } else {
      setAmount((state) => {
        return {
          value: parseFloat(value).toFixed(2),
          error: state.error,
        };
      });
    }
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    if (parseFloat(value).toFixed(2) < 0.01) {
      setAmount({
        value: "",
        error: "Amount must be greater than $0.01",
      });
    } else if (/[a-zA-Z]/.test(value)) {
      setAmount({
        value: parseFloat(value).toFixed(2).toString(),
        error: "Amount must not contain any letters",
      });
    } else if (isNaN(value)) {
      setAmount({ value: value, error: "Amount must be a valid number" });
    } else {
      setAmount({ value: value, error: "" });
    }
  };

  const chargeHandler = async () => {
    setLoader(true);
    const response = await chargeCustomer({
      id: params.customerId,
      amount: amount.value,
    });
    if (response.data.messages.resultCode === "Ok") {
      navigate(`/reporting/${response.data.transactionResponse.transId}`);
      setLoader(false);
    } else {
      setError({
        message: response.data.transactionResponse.errors[0].errorText,
      });
      setLoader(false);
    }
  };

  const deleteHandler = async () => {
    setLoader(true);
    const response = await deleteCustomer(params.customerId);
    if (response.data.messages.resultCode === "Ok") {
      navigate("/customer");
      setLoader(false);
    } else {
      setError({ message: "There was a problem deleting the customer" });
      setLoader(false);
    }
  };

  const clearErrorHandler = () => {
    setError(null);
  };

  useEffect(() => {
    const fetchCustomerRecord = async (id) => {
      setLoader(true);
      const response = await getACustomer(id);
      if (!response.data.profile) {
        setError({ message: response.data.error });
        setLoader(false);
      } else {
        setProfile(response.data.profile);
        setLoader(false);
      }
    };

    fetchCustomerRecord(params.customerId);
  }, [params]);

  return (
    <section id="customer-profile" className={classes.customerProfile}>
      <div className={classes.profileContainer}>
        <header>
          <h2>{profile ? profile.customerProfileId : ""}</h2>
          <div className="orange-divide"></div>
          <div>
            <span>
              {profile
                ? `${profile.paymentProfiles[0].billTo.firstName} ${profile.paymentProfiles[0].billTo.lastName}`
                : ""}
            </span>
            <p>{`${profile ? profile.email : ""}`}</p>
            <p>{`Customer Description: ${
              profile ? profile.description : "Customer was not found"
            }`}</p>
          </div>
        </header>
        {error && (
          <ErrorBox message={error.message} clear={clearErrorHandler} />
        )}
        {profile && (
          <div className={classes.info}>
            {loader && <Loader />}
            <div className={classes.billing}>
              <div className={classes.amount}>
                <div>
                  <div>
                    <label htmlFor="amount">Amount</label>
                  </div>
                  <input
                    name="amount"
                    className={classes.amountInput}
                    onBlur={onBlurHandler}
                    onChange={onChangeHandler}
                    type="text"
                    value={amount.value}
                    data-cy="custchargeamount"
                  />
                  <button
                    className={`${classes.chargeBtn} btn-dark-orange`}
                    onClick={chargeHandler}
                    disabled={amount.error}
                    data-cy="custchargebtn"
                  >
                    Charge
                  </button>
                  <button
                    onClick={deleteHandler}
                    className="btn-dark-orange"
                    disabled={amount.error}
                    data-cy="custdeletebtn"
                  >
                    Delete
                  </button>
                </div>
                <p>{amount.error}</p>
              </div>
              <h3>Billing Info</h3>
              <div className="sea-blue-divide"></div>
              <ul>
                <li>
                  First Name:{" "}
                  {profile && profile.paymentProfiles[0].billTo.firstName}
                </li>
                <li>
                  Last Name:{" "}
                  {profile && profile.paymentProfiles[0].billTo.lastName}
                </li>
                <li>
                  Company:{" "}
                  {profile && profile.paymentProfiles[0].billTo.company}
                </li>
                <li>
                  Address:{" "}
                  {profile && profile.paymentProfiles[0].billTo.address}
                </li>
                <li>
                  City: {profile && profile.paymentProfiles[0].billTo.city}
                </li>
                <li>
                  State: {profile && profile.paymentProfiles[0].billTo.state}
                </li>
                <li>Zip: {profile && profile.paymentProfiles[0].billTo.zip}</li>
                <li>
                  Country:{" "}
                  {profile && profile.paymentProfiles[0].billTo.country}
                </li>
              </ul>
            </div>
            <div className={classes.payment}>
              <h3>Payment Info</h3>
              <div className="sea-blue-divide"></div>
              <ul>
                <li>
                  Last Four:{" "}
                  {profile &&
                    profile.paymentProfiles[0].payment.creditCard.cardNumber}
                </li>
                <li>
                  Card Brand:{" "}
                  {profile &&
                    profile.paymentProfiles[0].payment.creditCard.cardType}
                </li>
                <li>
                  Bin Number:{" "}
                  {profile &&
                    profile.paymentProfiles[0].payment.creditCard.issuerNumber}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="spacer"></div>
    </section>
  );
};

export default CustomerDetail;
