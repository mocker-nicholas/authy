import { React, useReducer, useEffect } from "react";
import classes from "./pages-css/Home.module.css";
import TransGraph from "../components/Home/TransGraph";
import DailyTran from "../components/Home/DailyTran";
import { getDailyTotal, getStats } from "../lib/requests";
import { last7 } from "../lib/util";

const initialStatsState = {
  dates: last7(),
  totals: [0, 0, 0, 0, 0, 0, 0],
  weekTotal: "0.00",
  todaysTotal: "0.00",
};

const statsReducer = (state, action) => {
  if (action.type === "LAST_7") {
    return {
      ...state,
      dates: action.val.map(
        (stat) =>
          `${new Date(stat.date).getUTCMonth() + 1}/${new Date(
            stat.date
          ).getDate()}`
      ),
      totals: action.val.map((stat) => stat.total),
      weekTotal: parseFloat(
        action.val.map((stat) => stat.total).reduce((cur, accum) => cur + accum)
      ).toFixed(2),
    };
  }

  if (action.type === "TODAY") {
    return {
      ...state,
      todaysTotal: action.val,
    };
  }

  return initialStatsState;
};

const Home = (props) => {
  const [state, dispatch] = useReducer(statsReducer, initialStatsState);

  useEffect(() => {
    const getTotal = async () => {
      const response = await getDailyTotal();
      dispatch({ type: "TODAY", val: response.unsettled_tota });
    };

    const stats = async () => {
      const response = await getStats();
      dispatch({ type: "LAST_7", val: response });
    };

    stats();
    getTotal();
  }, []);

  return (
    <main className={classes.home}>
      <section className={classes.graph}>
        <header>
          <h2>Weekly Settlements</h2>
        </header>
        <div className="sea-blue-divide"></div>
        <TransGraph dates={state.dates} totals={state.totals} />
      </section>
      <section className={classes.summary}>
        <header>
          <h2>Daily Summary</h2>
          <div className="sea-blue-divide"></div>
        </header>
        <DailyTran
          todaysTotal={state.todaysTotal}
          weekTotal={state.weekTotal}
        />
      </section>
      <div className="spacer"></div>
    </main>
  );
};

export default Home;
