// MonthlySummary.js

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';

const MonthlySummary = ({ userId }) => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#d84d4d'];

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/summary/monthly', { params: { year, userId } })
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching monthly summary:', error));
  }, [year, userId]);

  const handleYearChange = (event) => setYear(event.target.value);

  return (
    <div>
      <Typography variant="h6">Monthly Summary for {year}</Typography>
      <Select value={year} onChange={handleYearChange}>
        {[2023, 2022, 2021].map((yearOption) => (
          <MenuItem key={yearOption} value={yearOption}>
            {yearOption}
          </MenuItem>
        ))}
      </Select>
      {data.map((monthData, index) => (
        <div key={index}>
          <Typography variant="subtitle1">Month: {monthData.month}</Typography>
          <PieChart width={400} height={300}>
            <Pie
              data={monthData.categories}
              dataKey="totalAmount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {monthData.categories.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      ))}
    </div>
  );
};

export default MonthlySummary;
