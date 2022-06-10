import { React, useEffect, useState } from "react";
import classes from "./CustomersCss/CustomerDetail.module.css";
import { useParams } from "react-router-dom";
import { getACustomer } from "../../lib/requests";

const CustomerDetail = (props) => {
  const [profile, setProfile] = useState(null);
  const params = useParams();
  console.log(params.customerId);
  useEffect(() => {
    const fetchCustomerRecord = async (id) => {
      const response = await getACustomer(id);
      console.log(response.data);
    };

    fetchCustomerRecord(params.customerId);
  }, [params]);

  return <div>customer profile</div>;
};

export default CustomerDetail;
