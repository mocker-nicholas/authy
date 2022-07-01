import { React, useEffect, useState } from "react";
import { getCustomers, searchCustomers } from "../lib/requests";
import { Link } from "react-router-dom";
import ErrorBox from "../components/UI/ErrorBox";
import FormGroup from "../components/UI/FormGroup.js";
import CustomerRow from "../components/Customers/CustomerRow";
import classes from "./pages-css/Customers.module.css";
import Loader from "../components/UI/Loader";

const Customers = () => {
  const [customerList, setCustomerList] = useState(null);
  const [loader, setLoader] = useState(false);
  const [param, setParam] = useState("name");
  const [searchVal, setSearchVal] = useState("");
  const [error, setError] = useState(null);

  const clearErrorHandler = () => {
    setError(null);
  };

  const searchParamHandler = (e) => {
    setParam(e.target.value);
  };

  const searchValHandler = (e) => {
    setSearchVal(e.target.value);
  };

  const formSubmitHandler = async () => {
    setLoader(true);
    const response = await searchCustomers({
      search_type: param,
      value: searchVal,
    });
    if (response.data.length === 0) {
      setError({ message: "No customer record found" });
      setLoader(false);
      return;
    } else if (response.data[0].profile) {
      setCustomerList(response.data);
    } else {
      setError({ message: "No customer record found" });
    }
    setLoader(false);
  };

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
        <div className={classes.headerFlex}>
          <div className={classes.headerFlex1}>
            <h2>Saved Customers</h2>
            <p>Create your own customer or charge a saved customer</p>
          </div>
          <div className={classes.headerFlex2}>
            <Link
              to="create"
              className="btn-dark-orange"
              data-cy="customerlink"
            >
              Create
            </Link>
          </div>
        </div>
        <div className="orange-divide"></div>
        <div className={classes.searchForm}>
          <select onChange={searchParamHandler}>
            <option value="name">Name</option>
            <option value="id">Customer Id</option>
          </select>
          <FormGroup
            className="formGroup"
            for="custsearch"
            type="text"
            onChange={searchValHandler}
            value={searchVal}
            data-cy="custforminput"
          />
          <button className="btn-dark-orange" onClick={formSubmitHandler}>
            Search
          </button>
        </div>
      </header>
      {error && <ErrorBox message={error.message} clear={clearErrorHandler} />}
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
