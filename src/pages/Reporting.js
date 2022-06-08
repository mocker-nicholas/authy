import { React, useEffect, useState } from "react";
import { searchUnsettled } from "../lib/requests";
import { nextPage, prevPage, offsetReset } from "../store/search-body-slice";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../components/Reporting/DataTable";
import classes from "./pages-css/Reporting.module.css";

const Reporting = () => {
  const searchBody = useSelector((state) => state.searchBody);
  const [tranData, setTranData] = useState();
  const dispatch = useDispatch();
  console.log(searchBody);

  useEffect(() => {
    const getTrans = async () => {
      const response = await searchUnsettled(searchBody);
      setTranData(response);
    };
    getTrans();
  }, []);
  return (
    <section id="reporting" className={classes.reporting}>
      <form>
        <div className={classes.dates}>
          <div>
            <div>
              <label htmlFor="startDate">Start Date</label>
            </div>
            <div>
              <input id="startDate" type="date"></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="endDate">End Date</label>
            </div>
            <div>
              <input id="endDate" type="date"></input>
            </div>
          </div>
        </div>
        <div className={classes.select}>
          <div>
            <div>
              <label htmlFor="status">Status</label>
            </div>
            <div>
              <select id="status" defaultValue="unsettled">
                <option value="unsettled">Unsettled</option>
                <option value="settled">Settled</option>
              </select>
            </div>
          </div>
          <div className={classes.button}>
            <button className="btn-dark-orange">Search</button>
          </div>
        </div>
      </form>
        <DataTable data={tranData} />
      <div>
        <button type="button">Prev</button>
        <button type="button">Next</button>
      </div>
      <div className="spacer"></div>
    </section>
  );
};

export default Reporting;
