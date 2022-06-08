import { React, useReducer } from "react";
import classes from "./pages-css/VirtualTerminal.module.css";
import FormGroup from "../components/UI/FormGroup";
import { onInputChange } from "../lib/vTValidate";

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
  console.log(formState.isBodyValid);
  // Reach out to authnet to get hosted page
  const submitHandler = async (e) => {
    dispatchForm({ type: "RESET" });
  };

  // Get new reducer state values and validate values, display errors
  const inputChangeHandler = (e) => {
    console.log(e.target.id);
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
    <section id="virtualTerminal">
      <form>
        <FormGroup
          for="amount"
          className=""
          label="Amount to Bill"
          onChange={inputChangeHandler}
          onBlur={onBlurHandler}
          value={formState.amount.value}
          errorText={formState.amount.hasError ? formState.amount.error : ""}
        />
        <div className={classes.names}>
          <FormGroup
            for="first"
            className=""
            label="First Name"
            onChange={inputChangeHandler}
            value={formState.first.value}
            errorText={formState.first.hasError ? formState.first.error : ""}
          />
          <FormGroup
            for="last"
            className=""
            label="LastName"
            onChange={inputChangeHandler}
            value={formState.last.value}
            errorText={formState.last.hasError ? formState.last.error : ""}
          />
        </div>
        <FormGroup
          for="company"
          className=""
          label="Company"
          onChange={inputChangeHandler}
          value={formState.company.value}
          errorText={formState.company.hasError ? formState.company.error : ""}
        />
        <FormGroup
          for="street"
          className=""
          label="Street Address"
          onChange={inputChangeHandler}
          value={formState.street.value}
          errorText={formState.street.hasError ? formState.street.error : ""}
        />
        <div className={classes.cityState}>
          <FormGroup
            for="city"
            className=""
            label="City"
            onChange={inputChangeHandler}
            value={formState.city.value}
            errorText={formState.city.hasError ? formState.city.error : ""}
          />
          <FormGroup
            for="state"
            className=""
            label="State"
            onChange={inputChangeHandler}
            value={formState.state.value}
            errorText={formState.state.hasError ? formState.state.error : ""}
          />
        </div>
        <div className={classes.zipCountry}>
          <FormGroup
            for="zip"
            className=""
            label="Zipcode"
            onChange={inputChangeHandler}
            value={formState.zip.value}
            errorText={formState.zip.hasError ? formState.zip.error : ""}
          />
          <FormGroup
            for="country"
            className=""
            label="Country"
            onChange={inputChangeHandler}
            value={formState.country.value}
            errorText={
              formState.country.hasError ? formState.country.error : ""
            }
          />
        </div>
        <button
          type="button"
          onClick={submitHandler}
          disabled={!formState.isBodyValid}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default VirtualTerminal;
