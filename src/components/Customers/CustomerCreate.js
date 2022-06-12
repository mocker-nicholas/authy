import React from "react";
import { useState, useReducer } from "react";
import ErrorBox from "../UI/ErrorBox";
import { useNavigate } from "react-router-dom";
import { onInputChange } from "../../lib/formValidate.js";
import { createCustomer } from "../../lib/requests";
import Loader from "../UI/Loader.js";
import FormGroup from "../UI/FormGroup.js";
import classes from "./CustomersCss/CustomerCreate.module.css";

const defaultState = {
  first: { value: "", touched: false, hasError: true, error: "" },
  last: { value: "", touched: false, hasError: true, error: "" },
  email: { value: "", touched: false, hasError: true, error: "" },
  company: { value: "", touched: false, hasError: true, error: "" },
  street: { value: "", touched: false, hasError: true, error: "" },
  city: { value: "", touched: false, hasError: true, error: "" },
  state: { value: "", touched: false, hasError: true, error: "" },
  zip: { value: "", touched: false, hasError: true, error: "" },
  description: { value: "", touched: false, hasError: true, error: "" },
  country: { value: "US", touched: false, hasError: false, error: "" },
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

const CustomerCreate = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, defaultState);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const clearErrorHandler = () => {
    setError(null);
  };

  const submitHandler = async () => {
    setLoader(true);
    const response = await createCustomer(formState);
    if (!response.data.customerProfileId) {
      setError({ message: response.data.messages.message[0].text });
      setLoader(false);
    } else {
      setLoader(false);
      navigate(`/customers/${response.data.customerProfileId}`);
    }
  };

  const inputChangeHandler = (e) => {
    onInputChange(e.target.id, e.target.value, dispatchForm, formState);
  };

  return (
    <section id="customer-create" className={classes.customerCreate}>
      {error && (
        <ErrorBox message={error.message} to="/vt" clear={clearErrorHandler} />
      )}
      {!error && (
        <header>
          <div className="orange-divide"></div>
          <p>Use the form below to create your own customer!</p>
          <p>
            Note: All customers will have default test payment method set on
            backend
          </p>
          <div className="orange-divide"></div>
        </header>
      )}

      <form>
        {loader && <Loader />}
        <div className="w100">
          <FormGroup
            for="description"
            className={
              formState.description.hasError && formState.description.touched
                ? `w100 ${classes.formGroup} red`
                : `${classes.formGroup} w100`
            }
            label="Customer Description"
            onChange={inputChangeHandler}
            value={formState.description.value}
            errorText={
              formState.description.hasError ? formState.description.error : ""
            }
          />
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
          <FormGroup
            for="email"
            className={
              formState.email.hasError && formState.email.touched
                ? `w100 ${classes.formGroup} red`
                : `${classes.formGroup} w100`
            }
            label="Email Address"
            onChange={inputChangeHandler}
            value={formState.email.value}
            errorText={formState.email.hasError ? formState.email.error : ""}
          />
        </div>
        <FormGroup
          for="company"
          className={
            formState.company.hasError && formState.company.touched
              ? `w100 ${classes.formGroup} red`
              : `${classes.formGroup} w100`
          }
          label="Company"
          onChange={inputChangeHandler}
          value={formState.company.value}
          errorText={formState.company.hasError ? formState.company.error : ""}
        />
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
            label="Zipcode"
            onChange={inputChangeHandler}
            value={formState.zip.value}
            errorText={formState.zip.hasError ? formState.zip.error : ""}
          />
          <FormGroup
            for="country"
            className={`${classes.formGroup} w100`}
            label="Country"
            onChange={inputChangeHandler}
            value={formState.country.value}
            errorText={
              formState.country.hasError ? formState.country.error : ""
            }
            disabled={true}
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

export default CustomerCreate;
