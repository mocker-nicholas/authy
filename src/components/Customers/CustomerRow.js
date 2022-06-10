import React from "react";
import classes from "./CustomersCss/CustomerRow.module.css";
import { Link } from "react-router-dom";

const CustomerRow = (props) => {
  const profile = props.data;
  return (
    <div className={classes.customerRow}>
      <div className={classes.item}>
        {profile.paymentProfiles[0].billTo
          ? `${profile.paymentProfiles[0].billTo.firstName} ${profile.paymentProfiles[0].billTo.lastName}`
          : "-"}
      </div>
      <div className={classes.item}>
        {profile.paymentProfiles[0].payment
          ? `${profile.paymentProfiles[0].payment.creditCard.cardNumber}`
          : "-"}
      </div>
      <div className={classes.item}>
        <Link className={classes.detail} to={`${profile.customerProfileId}`}>
          {profile.customerProfileId}
        </Link>
      </div>
    </div>
  );
};

export default CustomerRow;
