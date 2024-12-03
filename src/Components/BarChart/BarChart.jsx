import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { jwtDecode } from 'jwt-decode';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const valueFormatter = (value) => `Rs.${value}`;

const chartSetting = {
  yAxis: [{ label: 'Total expense (Rs)' }],
  width: 550,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)', // Reset the translation for label visibility
      marginRight: '20px', // Add space to the right to prevent overlap with values
    },
    [`.${axisClasses.left} .${axisClasses.tick}`]: {
      paddingLeft: '10px', // Space between the ticks and the axis
    },
  },
};


export default function YearChart() {
  const [userId, setUserId] = useState(null);
  const [year, setYear] = useState(null); // Initialize with null
  const [years, setYears] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchYears = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/entries/years/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch years');
      const years = await response.json();
      setYears(years);
    } catch (err) {
      setError('Error fetching years');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataset = async (userId, year) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/entries/yearly/${userId}/${year}`);
      if (!response.ok) throw new Error('Failed to fetch dataset');
      const data = await response.json();
      setDatasets(data);
    } catch (err) {
      setError('Failed to fetch dataset');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (userId) fetchYears(userId);
  }, [userId]);

  // Set the first year in the list as default
  useEffect(() => {
    if (years.length > 0) {
      setYear(years[0]);
    }
  }, [years]);

  useEffect(() => {
    if (userId && year) fetchDataset(userId, year);
  }, [userId, year]);

  const mappedSeries = categories.map((category) => ({
    dataKey: category.category_name,
    label: category.category_name,
    valueFormatter,
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center content horizontally
        padding: 3,
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel id="year-select-label">Select Year</InputLabel>
        <Select
          labelId="year-select-label"
          value={year || ''}
          onChange={(e) => setYear(e.target.value)}
          label="Select Year"
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Box sx={{ padding:'10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <BarChart
          dataset={datasets}
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={mappedSeries}
          {...chartSetting}
        />
      </Box>
    </Box>
  );
}
