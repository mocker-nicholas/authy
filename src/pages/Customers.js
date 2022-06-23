import { React, useEffect, useState } from "react";
import { getCustomers } from "../lib/requests";
import { Link } from "react-router-dom";
import CustomerRow from "../components/Customers/CustomerRow";
import classes from "./pages-css/Customers.module.css";
import Loader from "../components/UI/Loader";

const Customers = () => {
  const [customerList, setCustomerList] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getAllCustomers = async () => {
      setLoader(true);
      const customers = await getCustomers();
      setCustomerList(customers.data);
      setLoader(false);
    };
    getAllCustomers();
  }, []);
  return (
    <section id="customers" className={classes.customers}>
      <header>
        <div className="orange-divide"></div>
        <h2>Saved Customers</h2>
        <p>Create your own customer or charge a saved customer</p>
        <div className="orange-divide"></div>
        <Link to="create" className="btn-dark-orange" data-cy="customerlink">
          Create
        </Link>
      </header>
      <div className={classes.labels}>
        <div>Name</div>
        <div>Payment Method</div>
        <div>Customer Id</div>
      </div>
      <div id="customer-table" className={classes.customerTable}>
        {loader && <Loader />}
        {customerList &&
          customerList.map((customer) => {
            return (
              <CustomerRow
                key={customer.profile.customerProfileId}
                data={customer.profile}
              />
            );
          })}
      </div>
      <div className="spacer"></div>
    </section>
  );
};

export default Customers;
