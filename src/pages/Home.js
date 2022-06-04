import {React, useEffect} from "react";
import classes from "./pages-css/Home.module.css"
import { searchUnsettled } from "../lib/requests";
import {useSelector} from "react-redux"

const Home = (props) => {
  const searchBody = useSelector(state => state.searchBody)
  useEffect(() => {
    const transData = async (body) => {
      const response = await searchUnsettled(body)
      console.log(response)
    }

    transData({
      ...searchBody
    })
  }, [])

  return (
    <main className={classes.home}>
      <div>
      <section className={classes.graph}>
        <div>graph</div>
      </section>
      </div>
      <section className={classes.summary}>
        <div>Summary</div>
      </section>
    </main>
  );
};

export default Home;
