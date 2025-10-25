import React from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  // type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { SystemMetric } from "../types";
import { styleCpuPieChart, styleMemoryPieChart } from "../utils";

ChartJS.register(ArcElement, Tooltip, Legend);

// Custom plugin to display center text
const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart: any) {
    const {
      ctx,
      chartArea: { width, height },
    } = chart;
    ctx.save();

    // Get the custom text from chart options (so each chart can have different text)
    // const text = chart.options.plugins?.centerText?.text || "";
    // Instead of reading options.plugins.centerText, read a property you attach to chart
    const text = (chart as any)._centerText || "";

    // const fontSize = Math.max(Math.floor(width / 15), 12);
    const fontSize = Math.max(Math.floor(width / 20), 12);
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(text, width / 2, height / 2 + 10);
    ctx.restore();
  },
};
ChartJS.register(centerTextPlugin);

// const chartsData = [
//   // const cpu =
//   {
//     labels: ["Used", "Available"],
//     datasets: [
//       {
//         label: "% of CPU",
//         data: [10, 90],
//         backgroundColor: ["#00ff00", "#d1d5dc "],
//         borderColor: ["#00ff00", "#d1d5dc "],
//         borderWidth: 1,
//       },
//     ],
//     centerText: "CPU Usage: NA",
//   },

//   // const memory =
//   {
//     labels: ["Used", "Available"],
//     datasets: [
//       {
//         label: "% of memory",
//         data: [50, 50],
//         backgroundColor: ["#ff6900", "#d1d5dc "],
//         borderColor: ["#ff6900", "#d1d5dc "],
//         borderWidth: 1,
//       },
//     ],
//     centerText: "Memory Usage: NA",
//   },
// ];

// const doughnutOptions: ChartOptions<"doughnut"> = {
//   cutout: "50%", // 👈 percentage of the radius cut out (thickness = 50%)
//   plugins: {
//     legend: {
//       display: true,
//       position: "top" as const,
//       fullSize: true,
//       labels: {
//         font: {
//           size: 18,
//         },
//       },
//     },
//     // centerText: { text: "Doughnut" }, // pass custom text
//     // datalabels: {
//     //   color: "#f00",
//     //   formatter: (value: number, context: any) => {
//     //     console.log("value", value);
//     //     const dataset = context.chart.data.datasets[0].data;
//     //     const total = dataset.reduce((a: number, b: number) => a + b, 0);
//     //     const percentage = ((value / total) * 100).toFixed(1) + "%";
//     //     return percentage;
//     //   },
//     // },
//   },
// };

type ResourceChartsProps = {
  metric: SystemMetric | undefined;
};

export const ResourceCharts = ({ metric }: ResourceChartsProps) => {
  const chartsData = React.useMemo(() => {
    const chartsData = [
      // const cpu =
      {
        labels: ["Used", "Available"],
        datasets: [
          {
            label: "% of CPU",
            data: [0, 100],
            backgroundColor: ["#6b7280", "#d1d5dc "],
            borderColor: ["#6b7280", "#d1d5dc "],
            borderWidth: 1,
          },
        ],
        centerText: "CPU Usage: NA",
      },

      // const memory =
      {
        labels: ["Used", "Available"],
        datasets: [
          {
            label: "% of memory",
            data: [0, 100],
            backgroundColor: ["#6b7280", "#d1d5dc "],
            borderColor: ["#6b7280", "#d1d5dc "],
            borderWidth: 1,
          },
        ],
        centerText: "Memory Usage: NA",
      },
    ];

    // if (metric == undefined) return;
    if (metric != undefined) {
      chartsData[0].datasets[0].data = [
        metric.cpuLoadPercent,
        100 - metric.cpuLoadPercent,
      ];
      chartsData[0].centerText = `CPU Usage: ${metric.cpuLoadPercent.toFixed(2)}%`;
      chartsData[0].datasets[0].backgroundColor[0] = styleCpuPieChart(
        metric.cpuCondition,
      );
      chartsData[0].datasets[0].borderColor[0] = styleCpuPieChart(
        metric.cpuCondition,
      );

      const memPercent = (metric.memoryUsage / metric.totalMemory) * 100;
      chartsData[1].datasets[0].data = [memPercent, 100 - memPercent];
      chartsData[1].centerText = `Memory Usage: ${memPercent.toFixed(2)}%`;
      chartsData[1].datasets[0].backgroundColor[0] = styleMemoryPieChart(
        metric ? metric.memoryUsage / metric.totalMemory : 0,
      );
      chartsData[1].datasets[0].borderColor[0] = styleMemoryPieChart(
        metric ? metric.memoryUsage / metric.totalMemory : 0,
      );
    }

    return chartsData;
  }, [metric]);

  const chartRefs = React.useRef<any[]>([]);

  React.useEffect(() => {
    // if (metric == undefined) return;
    // chartsData[0].datasets[0].data = [
    //   metric.cpuLoadPercent,
    //   100 - metric.cpuLoadPercent,
    // ];
    // chartsData[0].centerText = `CPU Usage: ${metric.cpuLoadPercent}`;

    // const memPercent = (metric.memoryUsage / metric.totalMemory) * 100;
    // chartsData[1].datasets[0].data = [memPercent, 100 - memPercent];
    // chartsData[1].centerText = `Memory Usage: ${memPercent.toString()}`;

    // chartsData.map((cd) => console.log(cd.centerText));

    chartsData.map((cd, i) => {
      // if (chartRefs.current) {
      (chartRefs.current[i] as any)._centerText = cd.centerText;
      // }
    });

    // (chartRef.current as any)._centerText = chartsData[0].centerText;
    // chartRef.current.update(); // optional, only if plugin uses it in draw()
  }, [metric]);

  // console.log(chartsData);
  return (
    <div className="grid grid-cols-1 gap-1.5 p-3 text-xl md:grid-cols-2 md:gap-3 lg:gap-10 lg:p-10">
      <div className="mx-auto md:w-3/4">
        {/* <Doughnut data={cpu} options={doughnutOptions} /> */}
        {/* <Doughnut data={cpu} /> */}
      </div>
      <div className="mx-auto md:w-3/4">
        {/* <Doughnut data={memory} options={doughnutOptions} /> */}
        {/* <Doughnut data={memory} /> */}
      </div>
      {chartsData.map((chartData, i) => (
        <div key={i} className="mx-auto md:w-3/4">
          <Doughnut
            data={{
              labels: chartData.labels,
              datasets: chartData.datasets,
            }}
            options={{
              cutout: "50%", // 👈 percentage of the radius cut out (thickness = 50%)
              plugins: {
                legend: {
                  display: true,
                  position: "top" as const,
                  fullSize: true,
                  labels: {
                    font: {
                      size: 18,
                    },
                  },
                },
              },
            }}
            // ✅ Attach custom center text to the chart instance
            ref={(chartInstance) => {
              chartRefs.current[i] = chartInstance;

              // if (chartInstance)
              //   (chartInstance as any)._centerText = chartData.centerText;
            }}
          />
        </div>
      ))}
    </div>
  );
};
