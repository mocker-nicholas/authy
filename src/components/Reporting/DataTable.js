import { React } from "react";
import DataRow from "./DataRow";

const DataTable = (props) => {
  let tableContent = <div></div>;
  if (props.data) {
    tableContent = props.data.map((data) => {
      return <DataRow key={data.transId} data={data} />;
    });
  }

  return <div>{tableContent}</div>;
};

export default DataTable;
