import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false, // ✅ important
  scales: {
    y: {
      // ✅ Fixed ticks
      min: 0, // minimum value
      max: 100, // maximum value
      ticks: {
        stepSize: 10, // interval between ticks
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "System Resources",
    },
  },
};

// const labels = ["", "", "", "", "", "", "", "", "", ""];
// const data = {
//   labels,
//   datasets: [
//     {
//       label: "CPU",
//       data: labels.map(() => Math.random() * 99 + 1),
//       borderColor: "#2b7fff",
//       backgroundColor: "#51a2ff",
//     },
//     {
//       label: "Memory",
//       data: labels.map(() => Math.random() * 99 + 1),
//       borderColor: "#ad46ff",
//       backgroundColor: "#c27aff",
//     },
//   ],
// };

export const TimeSeriesChart = () => {
  const [dataPoints, setDataPoints] = React.useState<
    { cpu: number; mem: number }[]
  >([]);
  const [labels, setLabels] = React.useState<string[]>([]);

  // Simulate live updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      //   const newValue = Math.floor(Math.random() * 100); // random data
      const newLabel = new Date().toLocaleTimeString();

      setDataPoints((prev) => {
        const updated = [
          ...prev,
          {
            cpu: Math.floor(Math.random() * 100),
            mem: Math.floor(Math.random() * 100),
          },
        ];
        return updated.slice(-10); // keep only last 10 values
      });

      setLabels((prev) => {
        const updated = [...prev, newLabel];
        return updated.slice(-10); // keep last 10 labels
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: "Live Data",
  //         data: dataPoints,
  //         borderColor: "#36A2EB",
  //         backgroundColor: "#36A2EB33",
  //         tension: 0.3,
  //       },
  //     ],
  //   };
  const data = {
    labels,
    datasets: [
      {
        label: "CPU",
        data: dataPoints.map((dp) => dp.cpu),
        borderColor: "#2b7fff",
        backgroundColor: "#51a2ff",
      },
      {
        label: "Memory",
        data: dataPoints.map((dp) => dp.mem),
        borderColor: "#ad46ff",
        backgroundColor: "#c27aff",
      },
    ],
  };

  return (
    <div className="mb-12 h-96 md:mx-auto md:w-2/3">
      <Line options={options} data={data} />
    </div>
  );
};
