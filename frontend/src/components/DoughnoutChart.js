import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughoutChart({data}) {
//     const options = {
//   responsive: true,
//   maintainAspectRatio: false, // 🔥 MUST
// };
  return <Doughnut data={data} />;
}
