import {React, useState, useEffect} from "react"
import {last7} from "../../lib/util.js"
import { getStats } from "../../lib/requests.js";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const TransGraph = (props) => {
  const [statData, setStatData] = useState({});
  let dates = last7();
  let totals = [0, 0, 0, 0, 0, 0, 0]

  if(statData[0]){
    dates = statData.map(stat => {
      const date = new Date(stat.date)
      return `${date.getUTCMonth() + 1}/${date.getDate()}`
    })

    totals = statData.map(stat => {
      return parseFloat(stat.total).toFixed(2);
    })
  } 

  useEffect(() => {
    const stats = async () => {
      const response = await getStats();
      setStatData(response)
    }
    stats()
  }, [])

  return <Line height="60vh" width="80vw" data={{
      labels: dates,

      datasets: [{
        label: "Daily Settlements",
        data: totals,
        backgroundColor: [
          "rgb(2, 48, 71)"
      ],
      borderColor: [
        "rgb(2, 48, 71)"
      ],
      borderWidth: 1
      }]

    }}/>
} 

export default TransGraph;