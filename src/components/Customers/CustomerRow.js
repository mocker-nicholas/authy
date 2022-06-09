import React from "react";
import classes from "./CustomersCss/CustomerRow.module.css";

const CustomerRow = (props) => {
  const profile = props.data;
  return <div>{profile.customerProfileId}</div>;
};

export default CustomerRow;
