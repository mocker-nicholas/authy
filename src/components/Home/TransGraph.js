import { React } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const TransGraph = (props) => {
  return (
    <Line
      height="60vh"
      width="80vw"
      data={{
        labels: props.dates,

        datasets: [
          {
            label: "Daily Settlements",
            data: props.totals,
            backgroundColor: ["rgb(2, 48, 71)"],
            borderColor: ["rgb(2, 48, 71)"],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};

export default TransGraph;
