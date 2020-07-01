import React, { useRef, useEffect } from "react";
import Chart, { ChartType } from "chart.js";
import { BORDERCOLORS, BACKGROUNDCOLORS } from "../utils/CONSTANT";

interface Props {
  id: string;
  width?: string;
  height?: string;
  title?: string;
  type: ChartType;
  labels: string[];
  data: number[];
}
export default function CanvasChart(props: Props) {
  const { id, width, height, title, type, labels, data } = props;
  const canvas = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart>();

  useEffect(() => {
    const ctx = canvas.current!.getContext("2d");
    if (!ctx) return;

    chart.current = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [
          {
            // label: title,
            data,
            backgroundColor: function (context) {
              return BACKGROUNDCOLORS[
                (context.dataIndex || 0) % BACKGROUNDCOLORS.length
              ];
            },
            borderColor: function (context) {
              return BORDERCOLORS[
                (context.dataIndex || 0) % BACKGROUNDCOLORS.length
              ];
            },
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: title,
          fontSize: 16,
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => {
      chart.current!.destroy();
    };
  }, [type]);

  useEffect(() => {
    chart.current!.options.title!.text = title;
    chart.current!.update();
  }, [title]);

  useEffect(() => {
    chart.current!.data.labels = labels;
    chart.current!.update();
  }, [labels]);

  useEffect(() => {
    chart.current!.data.datasets![0].data = data;
    chart.current!.update();
  }, [data]);

  return (
    <div className="chart-wrapper">
      <canvas ref={canvas} id={id} width={width} height={height}>
        Your browser doesn't support canvas.
      </canvas>
    </div>
  );
}
