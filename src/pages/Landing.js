import React from "react";
import { Link } from "react-router-dom";
import classes from "./pages-css/Landing.module.css";
import ContentCard from "../components/UI/ContentCard";
import Footer from "../components/UI/Footer";
import compliant from "../img/compliant.svg";
import mobile from "../img/mobile.svg";
import payment from "../img/payment.svg";

const Landing = () => {
  return (
    <React.Fragment>
      <main className={classes.landing}>
        <header>
          <Link to="/home" className="btn-dark-blue">
            Continue to App
          </Link>
        </header>
        <section className={classes.cards}>
          <ContentCard
            svg={<img src={mobile} alt="Mobile Friendly"></img>}
            title="Mobile Friendly"
            content="Take payments from any device"
          />
          <ContentCard
            svg={<img src={compliant} alt="PCI Compliant"></img>}
            title="Secure"
            content="Stay PCI compliant with hosted payments"
          />
          <ContentCard
            svg={<img src={payment} alt="Proactive outreach"></img>}
            title="Collect"
            content="Reach your customers in more ways"
          />
        </section>
        <Footer />
      </main>
    </React.Fragment>
  );
};

export default Landing;
