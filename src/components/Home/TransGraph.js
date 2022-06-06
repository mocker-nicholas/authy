import { React } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const TransGraph = (props) => {
  const width = window.innerWidth;

  let chartH;
  if (width > 1000) {
    chartH = "30vh";
  } else {
    chartH = "60vh";
  }

  return (
    <Line
      height={chartH}
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
