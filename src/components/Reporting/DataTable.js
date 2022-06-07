import {React} from "react";

const DataTable = (props) => {
  let tableContent = <div></div>;
  if(props.data) {
    tableContent = props.data.map((data)=> {
      return <div key={data.transId}>{data.transId}</div>
    })
  }

  return tableContent
  
}

export default DataTable;