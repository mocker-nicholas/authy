import {React} from "react";
import classes from "./pages-css/Home.module.css";
import TransGraph from "../components/Home/TransGraph";


const Home = (props) => {
  return (
    <main className={classes.home}>
      <div>
      <section className={classes.graph}>
        <TransGraph/>
      </section>
      </div>
      <section className={classes.summary}>
        <div>Summary</div>
      </section>
    </main>
  );
};

export default Home;
