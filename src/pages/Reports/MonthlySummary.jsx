import React, { useState, useEffect } from 'react';
import { Typography, MenuItem, Select, Box, CircularProgress } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384']; // Added an extra color

const MonthlySummary = () => {
  const [userId, setUserId] = useState(null);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(null);
  const [data, setData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch User Data
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

  // Fetch Available Years
  const fetchYears = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/entries/years/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch years');
      const years = await response.json();
      setYears(years);
      if (years.length > 0) {
        setYear(years[0]); // Default to the first year in the list
      }
    } catch (err) {
      setError('Error fetching years');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Monthly Summary Data
  const fetchMonthlySummary = async () => {
    try {
      if (!userId || !year) return;
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/entries/monthly/${userId}/${year}`);
      const monthlyData = response.data;
      setData(monthlyData);

      // Extract unique categories
      const categories = new Set();
      monthlyData.forEach((month) =>
        month.categories.forEach((category) => categories.add(category.category))
      );
      setUniqueCategories([...categories]);
    } catch (error) {
      setError('Error fetching monthly summary');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Year Change
  const handleYearChange = (event) => setYear(event.target.value);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchYears(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userId && year) {
      fetchMonthlySummary();
    }
  }, [userId, year]);

  return (
    <Box padding="16px">
      <Typography variant="h6" marginBottom="16px">
        Monthly Summary for {year}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Select
          value={year}
          onChange={handleYearChange}
          displayEmpty
          style={{ marginBottom: '16px', width: '200px' }}
        >
          {years.map((yearOption) => (
            <MenuItem key={yearOption} value={yearOption}>
              {yearOption}
            </MenuItem>
          ))}
        </Select>
      )}

      {/* Display category legend */}
      {uniqueCategories.length > 0 && (
        <Box marginBottom="16px">
          <Typography variant="subtitle1" marginBottom="8px">
            Categories and Colors:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap="16px">
            {uniqueCategories.map((category, idx) => (
              <Box key={idx} display="flex" alignItems="center" gap="8px">
                <Box
                  width="16px"
                  height="16px"
                  borderRadius="50%"
                  bgcolor={COLORS[idx % COLORS.length]}
                />
                <Typography variant="body2">{category}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Render PieCharts in grid view */}
      {data.length > 0 ? (
        <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap="16px">
          {data.map((monthData, index) => (
            <Box key={index}>
              <Typography variant="subtitle1" textAlign="center" marginBottom="8px">
                {new Date(0, monthData.month - 1).toLocaleString('default', { month: 'long' })}
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={monthData.categories}
                    dataKey="totalAmount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                  >
                    {monthData.categories.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>{error || 'No data available for the selected year.'}</Typography>
      )}
    </Box>
  );
};

export default MonthlySummary;
