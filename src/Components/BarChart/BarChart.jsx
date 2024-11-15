import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

// Hardcoded dataset for rainfall in different cities by month
const dataset = [
  { month: 'Jan', london: 49, paris: 55, newYork: 78, seoul: 23 },
  { month: 'Feb', london: 38, paris: 42, newYork: 70, seoul: 35 },
  { month: 'Mar', london: 45, paris: 50, newYork: 85, seoul: 40 },
  { month: 'Apr', london: 42, paris: 53, newYork: 88, seoul: 57 },
  { month: 'May', london: 60, paris: 63, newYork: 95, seoul: 74 },
  { month: 'Jun', london: 55, paris: 68, newYork: 100, seoul: 82 },
  { month: 'Jul', london: 70, paris: 75, newYork: 120, seoul: 89 },
  { month: 'Aug', london: 65, paris: 71, newYork: 115, seoul: 94 },
  { month: 'Sep', london: 58, paris: 60, newYork: 98, seoul: 78 },
  { month: 'Oct', london: 50, paris: 55, newYork: 90, seoul: 62 },
  { month: 'Nov', london: 48, paris: 50, newYork: 85, seoul: 45 },
  { month: 'Dec', london: 52, paris: 57, newYork: 80, seoul: 30 },
];

// Formatter to display values with 'mm' suffix
const valueFormatter = (value) => `${value} mm`;

const chartSetting = {
  yAxis: [
    {
      label: 'Rainfall (mm)',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

export default function YearChart() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'london', label: 'London', valueFormatter },
        { dataKey: 'paris', label: 'Paris', valueFormatter },
        { dataKey: 'newYork', label: 'New York', valueFormatter },
        { dataKey: 'seoul', label: 'Seoul', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
