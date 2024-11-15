// YearlySummary.js

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Typography } from '@mui/material';
import axios from 'axios';

const YearlySummary = ({ userId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/api/summary/yearly', { params: { userId } })
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching yearly summary:', error));
  }, [userId]);

  return (
    <div>
      <Typography variant="h6">Yearly Summary</Typography>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalAmount" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default YearlySummary;
