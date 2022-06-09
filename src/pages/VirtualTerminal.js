import { React, useReducer, useState } from "react";
import classes from "./pages-css/VirtualTerminal.module.css";
import FormGroup from "../components/UI/FormGroup";
import { onInputChange } from "../lib/vTValidate";
import { getHostedToken } from "../lib/requests";

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
  // Reach out to authnet to get hosted page
  const submitHandler = async (e) => {
    const response = await getHostedToken(formState);
    setToken(response.data.token);
    dispatchForm({ type: "RESET" });
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
      <header>
        <button type="button" className="btn-dark-orange">
          Generate Random Transaction
        </button>
        <div className="orange-divide"></div>
        <p>Or, fill out the form below to create your own!</p>
        <div className="orange-divide"></div>
      </header>
      {!token && (
        <form>
          <FormGroup
            for="amount"
            className={
              formState.amount.hasError && formState.amount.touched
                ? `w100 red`
                : "w100"
            }
            label="Amount to Bill"
            onChange={inputChangeHandler}
            onBlur={onBlurHandler}
            value={formState.amount.value}
            errorText={formState.amount.hasError ? formState.amount.error : ""}
          />
          <div className={`${classes.names} w100`}>
            <FormGroup
              for="first"
              className={
                formState.first.hasError && formState.first.touched
                  ? `w100 red`
                  : "w100"
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
                  ? `w100 red`
                  : "w100"
              }
              label="Last Name"
              onChange={inputChangeHandler}
              value={formState.last.value}
              errorText={formState.last.hasError ? formState.last.error : ""}
            />
          </div>
          <FormGroup
            for="company"
            className={
              formState.company.hasError && formState.company.touched
                ? `w100 red`
                : "w100"
            }
            label="Company"
            onChange={inputChangeHandler}
            value={formState.company.value}
            errorText={
              formState.company.hasError ? formState.company.error : ""
            }
          />
          <FormGroup
            for="street"
            className={
              formState.street.hasError && formState.street.touched
                ? `w100 red`
                : "w100"
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
                  ? `w100 red`
                  : "w100"
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
                  ? `w100 red`
                  : "w100"
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
                  ? `w100 red`
                  : "w100"
              }
              label="Zipcode"
              onChange={inputChangeHandler}
              value={formState.zip.value}
              errorText={formState.zip.hasError ? formState.zip.error : ""}
            />
            <FormGroup
              for="country"
              className="w100"
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
          <button className="btn-dark-orange" onClick={resetToken}>
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
