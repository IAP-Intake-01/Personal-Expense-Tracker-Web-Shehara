import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import YearlySummaryCards from '../../Components/YearlyCards/YearlyCards';
import {jwtDecode} from 'jwt-decode'; // Make sure to install jwt-decode: `npm install jwt-decode`

export default function YearlySummaryChart() {
  const [data, setData] = useState({ years: [], categories: [], groupedData: [] });
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch user ID from the auth token
  const fetchUserData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) throw new Error('No authToken found in local storage');

      const decodedToken = jwtDecode(authToken);
      const email = decodedToken.email;
      if (!email) throw new Error('Email not found in token');

      const response = await fetch(`http://localhost:3000/api/auth/user/${email}`);
      if (!response.ok) throw new Error('Failed to fetch user data');

      const [data] = await response.json();
      console.log('Fetched User Data:', data);

      if (data) {
        setUserId(data.user_id);
      } else {
        throw new Error('User data not found');
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // Function to fetch yearly summary data
  const fetchYearlySummary = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/entries/yearlySummary/${id}`);
      if (!response.ok) throw new Error('Failed to fetch yearly summary');

      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchYearlySummary(userId);
    }
  }, [userId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data.years.length || !data.categories.length || !data.groupedData.length) {
    return <p>Loading...</p>;
  }

  // Prepare data for the chart
  const xAxisData = data.categories; // Categories are used for the x-axis
  const seriesData = data.groupedData.map((yearData) => ({
    label: yearData.year.toString(),
    data: yearData.totals.map((total) => parseFloat(total)),
  }));

  return (
    <div>
    
    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxisData }]}
      series={seriesData}
      width={800}
      height={400}
    />
    <YearlySummaryCards/>
    </div>
  );
}
