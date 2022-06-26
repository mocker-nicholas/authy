import { React, useReducer, useState } from "react";
import classes from "./pages-css/VirtualTerminal.module.css";
import FormGroup from "../components/UI/FormGroup";
import { onInputChange } from "../lib/formValidate";
import { getHostedToken, generateTransaction } from "../lib/requests";
import Loader from "../components/UI/Loader";
import { useNavigate } from "react-router-dom";
import ErrorBox from "../components/UI/ErrorBox";

const defaultState = {
  first: { value: "", touched: false, hasError: true, error: "" },
  last: { value: "", touched: false, hasError: true, error: "" },
  company: { value: "", touched: false, hasError: true, error: "" },
  street: { value: "", touched: false, hasError: true, error: "" },
  city: { value: "", touched: false, hasError: true, error: "" },
  state: { value: "", touched: false, hasError: true, error: "" },
  zip: { value: "", touched: false, hasError: true, error: "" },
  country: { value: "US", touched: false, hasError: false, error: "" },
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

const VirtualTerminal = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, defaultState);
  const [token, setToken] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateHandler = async () => {
    setLoader(true);
    const response = await generateTransaction();
    if (response.data.errors) {
      setLoader(false);
      setError({ message: response.data.errors[0].errorText });
      return;
    }
    navigate(`/reporting/${response.data.transId}`);
    setLoader(false);
  };

  const clearErrorHandler = () => {
    setError(null);
  };
  // Reach out to authnet to get hosted page
  const submitHandler = async (e) => {
    setLoader(true);
    const response = await getHostedToken(formState);
    setToken(response.data.token);
    dispatchForm({ type: "RESET" });
    setLoader(false);
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

  const resetToken = () => {
    setTimeout(() => {
      setToken(null);
    }, 3000);
  };

  return (
    <section id="virtualTerminal" className={classes.virtualTerminal}>
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
          <p>
            Use the form below to create a hosted payments page, or use the
            button to generate a random transaction!
          </p>
          <div className="orange-divide"></div>
          <button
            type="button"
            className="btn-dark-orange"
            onClick={generateHandler}
            data-cy="generatetransbtn"
          >
            Generate Random Transaction
          </button>
        </header>
      )}
      {!token && (
        <form data-cy="vtform">
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
            cy="amount-cy"
            errorText={formState.amount.hasError ? formState.amount.error : ""}
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
              cy="first-cy"
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
              cy="last-cy"
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
            errorText={
              formState.company.hasError ? formState.company.error : ""
            }
            cy="company-cy"
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
            cy="street-cy"
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
              cy="city-cy"
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
              cy="state-cy"
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
              cy="zip-cy"
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
              cy="country-cy"
            />
          </div>
          <button
            type="button"
            onClick={submitHandler}
            disabled={!formState.isBodyValid}
            className="btn-dark-orange"
            data-cy="vtsubmitbtn"
          >
            Submit
          </button>
        </form>
      )}
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
          <button
            className="btn-dark-orange"
            onClick={resetToken}
            data-cy="gottoauthbtn"
          >
            {" "}
            Proceed To Payment
          </button>
        </form>
      )}
      <div className="spacer"></div>
    </section>
  );
};

export default VirtualTerminal;
