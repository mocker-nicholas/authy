import { React, useEffect, useState, useRef } from "react";
import { searchTransactions } from "../lib/requests";
import { nextPage, prevPage, bodyUpdate } from "../store/search-body-slice";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../components/Reporting/DataTable";
import classes from "./pages-css/Reporting.module.css";
import Loader from "../components/UI/Loader";

const Reporting = () => {
  const searchBody = useSelector((state) => state.searchBody);
  const [tranData, setTranData] = useState();
  const [formReady, setFormReady] = useState({
    date: false,
    status: false,
  });
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const firstDate = useRef(null);
  const status = useRef("unsettled");

  const submitFormHandler = () => {
    setLoader(true);
    dispatch(
      bodyUpdate({
        status: status.current.value,
        firstDate: firstDate.current.value,
        lastDate: firstDate.current.value,
      })
    );
    setLoader(false);
  };

  const dateChangeHandler = () => {
    setFormReady((state) => {
      return { ...state, date: true };
    });
  };

  const statusChangeHandler = () => {
    setFormReady((state) => {
      return { ...state, status: true };
    });
  };

  const nextPageHandler = () => {
    dispatch(nextPage());
  };

  const prevPageHandler = () => {
    dispatch(prevPage());
  };

  useEffect(() => {
    const getTrans = async () => {
      setLoader(true);
      const response = await searchTransactions(searchBody);
      setTranData(response);
      setLoader(false);
    };
    getTrans();
  }, [searchBody]);
  return (
    <section id="reporting" className={classes.reporting}>
      <form>
        <div className={classes.inputs}>
          <div>
            <div>
              <label htmlFor="startDate">Date</label>
            </div>
            <input
              id="startDate"
              type="date"
              ref={firstDate}
              onChange={dateChangeHandler}
            ></input>
          </div>
          <div>
            <div>
              <label htmlFor="status">Status</label>
            </div>
            <select
              id="status"
              defaultValue="unsettled"
              ref={status}
              onChange={statusChangeHandler}
            >
              <option value="unsettled">Unsettled</option>
              <option value="settled">Settled</option>
            </select>
          </div>
        </div>
        <div className={classes.button}>
          <button
            className="btn-dark-orange"
            type="button"
            onClick={submitFormHandler}
            disabled={!formReady.date || !formReady.status}
          >
            Search
          </button>
        </div>
      </form>
      <DataTable data={tranData} />
      {loader && <Loader />}
      <div className={classes.pageButtons}>
        <button
          type="button"
          className="btn-dark-orange"
          onClick={prevPageHandler}
          disabled={searchBody.offset === 1 && true}
        >
          {`< Page ${searchBody.offset - 1} `}
        </button>
        <button
          type="button"
          className="btn-dark-orange"
          onClick={nextPageHandler}
          disabled={
            tranData !== undefined && tranData.length !== 20 ? true : false
          }
        >
          {`Page ${searchBody.offset + 1} >`}
        </button>
      </div>
      <div className="spacer"></div>
    </section>
  );
};

export default Reporting;
