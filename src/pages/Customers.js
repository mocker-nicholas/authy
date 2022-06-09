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
    <section id="customers">
      {customerList &&
        customerList.map((customer) => {
          return (
            <CustomerRow
              key={customer.profile.customerProfileId}
              data={customer.profile}
            />
          );
        })}
    </section>
  );
};

export default Customers;
