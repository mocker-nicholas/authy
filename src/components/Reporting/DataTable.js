import { React } from "react";
import classes from "./ReportingCss/DataTable.module.css";
import DataRow from "./DataRow";

const DataTable = (props) => {
  let tableContent = <tr></tr>;
  if (props.data) {
    tableContent = props.data.map((data) => {
      return <DataRow key={data.transId} data={data} />;
    });
  }

  return (
    <div className={classes.wrapper}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.green}>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Name</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
};

export default DataTable;
