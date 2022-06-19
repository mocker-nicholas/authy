//////////////// Form Validations ////////////////////////
export const validateInput = (name, value) => {
  let hasError = false,
    error = "";
  switch (name) {
    case "email":
      if (value.trim() === "") {
        hasError = true;
        error = "Email cannot be empty";
      } else if (/[#$%^*:{}]/g.test(value)) {
        hasError = true;
        error =
          "Only '&', '_', '-', '@', and '!' are allowed as special characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "description":
      if (value.trim() === "") {
        hasError = true;
        error = "Description cannot be empty";
      } else if (!/^[\w .,!?]+$/.test(value)) {
        hasError = true;
        error = "Only letters, numbers, periods, and commas allowed";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "amount":
      if (parseFloat(value).toFixed(2) < 0.01) {
        hasError = true;
        error = "Amount must be greater than $0.01";
      } else if (/[a-zA-Z]/.test(value)) {
        hasError = true;
        error = "Amount must not contain any letters";
      } else if (isNaN(value)) {
        hasError = true;
        error = "Amount must be a valid number";
      } else if (value === "") {
        hasError = true;
        error = "Amount is required";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "first":
      if (value.trim() === "") {
        hasError = true;
        error = "Name cannot be empty";
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true;
        error = "Invalid Name. Avoid Special characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "last":
      if (value.trim() === "") {
        hasError = true;
        error = "Name cannot be empty";
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true;
        error = "Invalid Name. Avoid Special characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "company":
      if (value.trim() === "") {
        hasError = true;
        error = "Company name cannot be empty";
      } else if (/[#$%^*]/g.test(value)) {
        hasError = true;
        error =
          "Only '&', '_', '-', '@', and '!' are allowed as special characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "street":
      if (value.trim() === "") {
        hasError = true;
        error = "Street address cannot be empty";
      } else if (/[@!&$%^*]/g.test(value)) {
        hasError = true;
        error = "Invalid Address. Avoid Special characters";
      } else {
        hasError = false;
        error = "";
      }
      break;

    case "city":
      if (value.trim() === "") {
        hasError = true;
        error = "City cannot be empty";
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true;
        error = "Invalid City. Avoid Special characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "state":
      if (value.trim() === "") {
        hasError = true;
        error = "State cannot be empty";
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true;
        error = "Invalid State. Avoid Special characters";
      } else if (value.trim().length > 2) {
        hasError = true;
        error = "Please use abbreviation";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "zip":
      if (value.trim() === "") {
        hasError = true;
        error = "Zip cannot be empty";
      } else if (!/^[0-9]+$/.test(value)) {
        hasError = true;
        error = "Invalid Zip Code";
      } else if (value.trim().length > 5) {
        hasError = true;
        error = "Please use 5 digit zip";
      } else {
        hasError = false;
        error = "";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};

export const onInputChange = (name, value, dispatch, bodyState) => {
  const { hasError, error } = validateInput(name, value);
  let isBodyValid;

  // Check your new reducer state object for any errors and set the body to invalid if errors exist
  for (const key in bodyState) {
    const item = bodyState[key];
    // Check if the current field has error
    if (key === name && hasError) {
      isBodyValid = false;
      break;
    } else if (key !== name && item.hasError) {
      // Check if any other field has error
      isBodyValid = false;
      break;
    } else {
      isBodyValid = true;
    }
  }

  // Update your state object with new values and new errors from validate input
  dispatch({
    type: "FORM_CHANGE",
    data: {
      name,
      value,
      hasError: hasError,
      error: error,
      touched: true,
      isBodyValid,
    },
  });
};
