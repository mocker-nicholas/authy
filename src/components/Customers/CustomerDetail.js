import { React, useEffect, useState } from "react";
import classes from "./CustomersCss/CustomerDetail.module.css";
import { useParams } from "react-router-dom";
import { getACustomer } from "../../lib/requests";
import Loader from "../UI/Loader";
import ErrorBox from "../UI/ErrorBox";

const CustomerDetail = (props) => {
  const [profile, setProfile] = useState(null);
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

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
        {error && <ErrorBox message={error.message} />}
        {profile && (
          <div className={classes.info}>
            {loader && <Loader />}
            <div className={classes.billing}>
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
