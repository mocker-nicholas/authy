import { React, useReducer, useEffect, useState } from "react";
import classes from "./pages-css/Home.module.css";
import TransGraph from "../components/Home/TransGraph";
import DailyTran from "../components/Home/DailyTran";
import { getDailyTotal, lastMonthTotal, getStats } from "../lib/requests";
import { last7 } from "../lib/util";
import Loader from "../components/UI/Loader";

const initialStatsState = {
  dates: last7(),
  totals: [0, 0, 0, 0, 0, 0, 0],
  weekTotal: "0.00",
  todaysTotal: "0.00",
  dailyNum: "0",
  lastMonthDates: [],
  lastMonthstotals: null,
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
      todaysTotal: action.val.unsettled_total,
      dailyNum: action.val.totalTrans,
    };
  }

  if (action.type === "MONTH") {
    return {
      ...state,
      lastMonthDates: action.val.map((day) => day.date),
      lastMonthTotals: action.val.map((day) =>
        parseFloat(day.amount).toFixed(2)
      ),
    };
  }

  return initialStatsState;
};

const Home = (props) => {
  const [state, dispatch] = useReducer(statsReducer, initialStatsState);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getTotal = async () => {
      setLoader(true);
      const response = await getDailyTotal();
      dispatch({ type: "TODAY", val: response });
      setLoader(false);
    };

    const stats = async () => {
      const response = await getStats();
      dispatch({ type: "LAST_7", val: response });
    };

    const prevMonth = async (body) => {
      const response = await lastMonthTotal(body);
      dispatch({ type: "MONTH", val: response });
    };

    const year = new Date().getFullYear();
    const month = new Date().getUTCMonth() - 1;

    prevMonth({ year: year, month: month });
    stats();
    getTotal();
  }, []);

  return (
    <main className={classes.home}>
      {loader && <Loader />}
      <section className={classes.summary}>
        <header>
          <h2>Summary</h2>
        </header>
        <DailyTran
          todaysTotal={state.todaysTotal}
          weekTotal={state.weekTotal}
          todaysNum={state.dailyNum}
        />
      </section>
      <section className={classes.graph}>
        <header>
          <h2>Settlement History</h2>
        </header>

        <div className={classes.graphContainer}>
          <h3>Past Week</h3>
          <TransGraph dates={state.dates} totals={state.totals} />
        </div>
        <div className={classes.graphContainer}>
          <h3>Previous Month</h3>
          <TransGraph
            dates={state.lastMonthDates}
            totals={state.lastMonthTotals}
          />
        </div>
      </section>
      <div className={`spacer ${classes.hide}`}></div>
    </main>
  );
};

export default Home;
