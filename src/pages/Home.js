import {React} from "react";
import classes from "./pages-css/Home.module.css";
import TransGraph from "../components/Home/TransGraph";
import DailyTran from "../components/UI/DailyTran";

const Home = (props) => {
  return (
    <main className={classes.home}>
      <section className={classes.graph}>
        <header>
          <h2>Weekly Settlements</h2>
        </header>
        <div className="sea-blue-divide"></div>
        <TransGraph/>
      </section>
      <section className={classes.summary}>
        <header>

        <h2>Daily Summary</h2>
        <div className="sea-blue-divide"></div>
        </header>
      <DailyTran weekTotal="450.00"/>
      </section>
    </main>
  );
};

export default Home;
