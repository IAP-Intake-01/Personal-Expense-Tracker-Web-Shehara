import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function PieAnimation() {
  const [userId, setUserId] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pastelColors = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384',
  ];

  // Fetch user data from localStorage using JWT token
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

  // Fetch category data and calculate percentages
  const handleFetchCategoryData = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const categoryResponse = await axios.get(`http://localhost:3000/api/entries/totals/${userId}`);
      console.log('Raw API Response:', categoryResponse.data);

      const data = categoryResponse.data;
      const total = data.reduce((sum, category) => sum + parseFloat(category.totalAmount || 0), 0);

      const transformedData = data.map((category, index) => {
        const totalAmount = parseFloat(category.totalAmount);
        const safeTotalAmount = isNaN(totalAmount) ? 0 : totalAmount;
        const percentage = total > 0 ? (safeTotalAmount / total) * 100 : 0;
        const safeLabel = category.categoryName || `Category Unknown`;

        return {
          id: index,
          label: safeLabel,
          value: safeTotalAmount,
          color: pastelColors[index % pastelColors.length], // Assign pastel color
        };
      });

      console.log('Transformed Data:', transformedData);
      setCategoryData(transformedData);
    } catch (err) {
      setError(err.message || 'Failed to fetch data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      handleFetchCategoryData();
    }
  }, [userId]);

  return (
    <Box className='flex justify-centre align-centre ' sx={{ width: '450px' }} >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : categoryData.length > 0 ? (
        <Box >
          <PieChart
            series={[
              {
                data: categoryData, // Provide the transformed category data
                innerRadius: 60, // Create the donut effect
                outerRadius: 100, // Set outer radius to adjust size
                color: categoryData.map((entry) => entry.color), // Set colors directly in the series
              },
            ]}
            width={450}
            height={300} // Donut shape
          />
          
        </Box>
      ) : (
        <p>No data available to display</p>
      )}
    </Box>
  );
}
