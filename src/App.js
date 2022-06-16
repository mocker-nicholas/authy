import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/UI/NavBar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Reporting from "./pages/Reporting";
import VirtualTerminal from "./pages/VirtualTerminal";
import Invoicing from "./pages/Invoicing";
import Customers from "./pages/Customers";
import CustomerDetail from "./components/Customers/CustomerDetail";
import TransactionDetail from "./components/Reporting/TransactionDetail";
import CustomerCreate from "./components/Customers/CustomerCreate";
import InvoiceDetail from "./components/Invoices/InvoiceDetail";
import PayMyInvoice from "./components/Invoices/PayMyInvoice";
import InvoiceCreate from "./components/Invoices/InvoiceCreate";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/paymyinvoice/:invoiceId" element={<PayMyInvoice />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/vt" element={<VirtualTerminal />}></Route>
        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/customers/create" element={<CustomerCreate />}></Route>
        <Route path="/customers/:customerId" element={<CustomerDetail />}>
          {" "}
        </Route>
        <Route path="/reporting" element={<Reporting />}></Route>
        <Route
          path="/reporting/:transactionId"
          element={<TransactionDetail />}
        ></Route>
        <Route path="/invoicing" element={<Invoicing />}></Route>
        <Route path="/invoicing/create" element={<InvoiceCreate />}></Route>
        <Route path="/invoicing/:invoiceId" element={<InvoiceDetail />}></Route>
        <Route path="/invoicing/:invoiceId/update" element={<Home />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
