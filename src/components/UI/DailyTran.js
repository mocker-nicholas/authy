import {React, useState, useEffect} from "react";
import classes from "./UiCss/DailyTran.module.css"
import { useSelector, useDispatch } from "react-redux";
import { nextPage, offsetReset } from "../../store/search-body-slice";
import { searchUnsettled } from "../../lib/requests";

const DailyTran = props => {
  const searchBodyState = useSelector((state) => state.searchBody);
  const dispatch = useDispatch();
  const [todaysTotal, setTodaysTotal] = useState("0.00")
  const [numTrans, setNumTrans] = useState(0);

  const next = () => {
    dispatch(nextPage());
  }

  const reset = () => {
    dispatch(offsetReset());
  }

  useEffect(() => {
    console.log(searchBodyState.offset)
    let arrLength = 0;
    let currTotal = 0;
    while(arrLength === 20) {
    const getDailyTotal = async () => {
        const trans = await searchUnsettled(searchBodyState);
        console.log(arrLength)
        arrLength = trans.length;
        console.log(arrLength)
        const amounts = trans.map(tran => tran.settleAmount);
        const total = amounts.reduce((cur, accum) => cur + accum)
        currTotal+= total;
        console.log(currTotal)
        console.log(searchBodyState.offset)
        console.log("here")
      }
      getDailyTotal();
    }
      reset();
  }, [])
  return (
    <section id="dailySummary">
      <div>Past Week Income: $<span>{props.weekTotal}</span></div>
      <div>Todays Total: $<span>{todaysTotal}</span></div>
    </section>
  )
}

export default DailyTran;