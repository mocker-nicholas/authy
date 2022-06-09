import React from "react";
import { createCustomer } from "../lib/requests";

const Customers = () => {
  const createHandler = async () => {
    const response = await createCustomer({ message: "I made it!" });
    console.log(response);
  };
  return (
    <section id="customers">
      <div>
        <button onClick={createHandler}>Create</button>
      </div>
    </section>
  );
};

export default Customers;
