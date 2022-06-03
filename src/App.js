import React from "react";
import { Route, Routes } from "react-router-dom";
// import NavBar from "./components/UI/NavBar";
import Landing from "./pages/Landing";
import Reporting from "./pages/Reporting";
import VirtualTerminal from "./pages/VirtualTerminal";
import Invoicing from "./pages/Invoicing";
import Customers from "./pages/Customers"


function App() {
  return (
    <React.Fragment>
    <Routes>
      <Route path="/"element={<Landing/>}/>
      <Route path="/vt" element={<VirtualTerminal/>}></Route>
      <Route path="/customers" element={<Customers/>}></Route>
      <Route path="/reporting" element={<Reporting/>}></Route>
      <Route path="/invoicing" element={<Invoicing/>}></Route>
    </Routes>
    </React.Fragment>
  );
}

export default App;
