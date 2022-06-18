import React from "react";
import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { onInputChange } from "../../lib/formValidate";
import { createInvoice } from "../../lib/requests";
import Loader from "../UI/Loader";
import ErrorBox from "../UI/ErrorBox";
import FormGroup from "../UI/FormGroup";
import classes from "./InvoicesCss/InvoiceCreate.module.css";

const defaultState = {
  first: { value: "", touched: false, hasError: true, error: "" },
  last: { value: "", touched: false, hasError: true, error: "" },
  street: { value: "", touched: false, hasError: true, error: "" },
  city: { value: "", touched: false, hasError: true, error: "" },
  state: { value: "", touched: false, hasError: true, error: "" },
  zip: { value: "", touched: false, hasError: true, error: "" },
  description: { value: "", touched: false, hasError: false, error: "" },
  amount: { value: "0.00", touched: false, hasError: true, error: "" },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "FORM_CHANGE":
      const { name, value, hasError, error, touched, isBodyValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isBodyValid,
      };

    // Reset the form after payment page redirect
    case "RESET":
      return {
        ...defaultState,
      };
    default:
      break;
  }
  return defaultState;
};

const InvoiceCreate = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, defaultState);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const clearErrorHandler = () => {
    setError(null);
  };

  const submitHandler = async () => {
    setLoader(true);
    const body = {
      address: formState.street.value,
      city: formState.city.value,
      state: formState.state.value,
      zip: formState.zip.value,
      first: formState.first.value,
      last: formState.last.value,
      description: formState.description.value,
      paid: 0,
      amount: formState.amount.value,
    };

    const response = await createInvoice(body);
    if (response.data.message) {
      setLoader(false);
      navigate(`/invoice/${response.data.invoice_number}`);
    } else {
      setError({ message: "There was a problem creating your invoice" });
      setLoader(false);
    }
    console.log(response.data);
  };

  // Get new reducer state values and validate values, display errors
  const inputChangeHandler = (e) => {
    onInputChange(e.target.id, e.target.value, dispatchForm, formState);
  };

  const onBlurHandler = (e) => {
    if (e.target.value === "") {
      e.target.value = 0.0;
    }
    onInputChange(
      e.target.id,
      parseFloat(e.target.value).toFixed(2),
      dispatchForm,
      formState
    );
  };

  return (
    <section id="InvoiceForm" className={classes.invoiceForm}>
      {error && (
        <div className={classes.errorContainer}>
          <ErrorBox
            message={error.message}
            to="/vt"
            clear={clearErrorHandler}
          />
        </div>
      )}
      {!error && (
        <header>
          <div className="orange-divide"></div>
          <p>Fill out the form below to create your invoice</p>
          <div className="orange-divide"></div>
        </header>
      )}
      <form>
        {loader && <Loader />}
        <FormGroup
          for="amount"
          className={
            formState.amount.hasError && formState.amount.touched
              ? `w100 ${classes.formGroup} red`
              : `${classes.formGroup} w100`
          }
          label="Amount to Bill"
          onChange={inputChangeHandler}
          onBlur={onBlurHandler}
          value={formState.amount.value}
          errorText={formState.amount.hasError ? formState.amount.error : ""}
        />
        <FormGroup
          for="description"
          className={
            formState.description.hasError && formState.description.touched
              ? `w100 ${classes.formGroup} red`
              : `${classes.formGroup} w100`
          }
          label="Job description"
          onChange={inputChangeHandler}
          value={formState.description.value}
          errorText={
            formState.description.hasError ? formState.description.error : ""
          }
        />
        <div className={`${classes.names} w100`}>
          <FormGroup
            for="first"
            className={
              formState.first.hasError && formState.first.touched
                ? `w100 ${classes.formGroup} red`
                : `${classes.formGroup} w100`
            }
            label="First Name"
            onChange={inputChangeHandler}
            value={formState.first.value}
            errorText={formState.first.hasError ? formState.first.error : ""}
          />
          <FormGroup
            for="last"
            className={
              formState.last.hasError && formState.last.touched
                ? `w100 ${classes.formGroup} red`
                : `${classes.formGroup} w100`
            }
            label="Last Name"
            onChange={inputChangeHandler}
            value={formState.last.value}
            errorText={formState.last.hasError ? formState.last.error : ""}
          />
        </div>
        <FormGroup
          for="street"
          className={
            formState.street.hasError && formState.street.touched
              ? `w100 ${classes.formGroup} red`
              : `${classes.formGroup} w100`
          }
          label="Street Address"
          onChange={inputChangeHandler}
          value={formState.street.value}
          errorText={formState.street.hasError ? formState.street.error : ""}
        />
        <div className={`${classes.cityState} w100`}>
          <FormGroup
            for="city"
            className={
              formState.city.hasError && formState.city.touched
                ? `w100 ${classes.formGroup} red`
                : `${classes.formGroup} w100`
            }
            label="City"
            onChange={inputChangeHandler}
            value={formState.city.value}
            errorText={formState.city.hasError ? formState.city.error : ""}
          />
          <FormGroup
            for="state"
            className={
              formState.state.hasError && formState.state.touched
                ? `w100 ${classes.formGroup} red`
                : `${classes.formGroup} w100`
            }
            label="State"
            onChange={inputChangeHandler}
            value={formState.state.value}
            errorText={formState.state.hasError ? formState.state.error : ""}
          />
        </div>
        <div className={`${classes.zipCountry} w100`}>
          <FormGroup
            for="zip"
            className={
              formState.zip.hasError && formState.zip.touched
                ? `w100 ${classes.formGroup} red`
                : `${classes.formGroup} w100`
            }
            label="Zip Code"
            onChange={inputChangeHandler}
            value={formState.zip.value}
            errorText={formState.zip.hasError ? formState.zip.error : ""}
          />
        </div>
        <button
          type="button"
          onClick={submitHandler}
          disabled={!formState.isBodyValid}
          className="btn-dark-orange"
        >
          Submit
        </button>
      </form>
      <div className="spacer"></div>
    </section>
  );
};

export default InvoiceCreate;
