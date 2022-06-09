import { React, useEffect, useState } from "react";
import { getCustomers } from "../lib/requests";
import CustomerRow from "../components/Customers/CustomerRow";
import classes from "./pages-css/Customers.module.css";

const Customers = () => {
  const [customerList, setCustomerList] = useState(null);
  console.log(customerList);

  useEffect(() => {
    const getAllCustomers = async () => {
      const customers = await getCustomers();
      setCustomerList(customers.data);
    };
    getAllCustomers();
  }, []);
  return (
    <section id="customers" className={classes.customers}>
      <header>
        <h2>Your Saved Customers</h2>
        <button className="btn-dark-orange">Create</button>
      </header>
      <div id="customer-table" className={classes.customerTable}>
        <div>
          <div>Name</div>
          <div>Payment Method</div>
          <div>Info</div>
        </div>
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
