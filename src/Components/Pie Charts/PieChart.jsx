import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'; // Ensure axios is installed

export default function PieAnimation() {
  const [radius, setRadius] = useState(50);
  const [itemNb, setItemNb] = useState(5);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [userId, setUserId] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const handleItemNbChange = (event, newValue) => {
    setItemNb(newValue);
  };

  const handleRadius = (event, newValue) => {
    setRadius(newValue);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleFetchCategoryData = async () => {
    if (!userId) {
      alert('Please enter a valid User ID');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/entries/totals/${userId}`);
      if (response.status === 200) {
        const transformedData = response.data.map((category) => {
          const totalAmount = parseFloat(category.totalAmount); // Convert string to number
          return {
            label: category.categoryName || `Category ${category.category_id}`, // Default label if categoryName is missing
            value: totalAmount,
            formattedValue: String(category.formattedValue?.text || category.formattedValue || totalAmount.toFixed(2)), // Ensures formattedValue is a string
          };
        });
        setCategoryData(transformedData);
      } else {
        alert('No data available for this User ID');
      }
    } catch (error) {
      alert('Failed to fetch category data. Please try again later.');
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const chartData = categoryData.map((category) => ({
    label: category.label,
    value: category.value,
    formattedValue: category.formattedValue, // You might want to use this for the value label
  }));

  const valueFormatter = (value) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      return numValue.toFixed(2);
    }
    return value;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        label="Enter User ID"
        variant="outlined"
        value={userId}
        onChange={handleUserIdChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchCategoryData}
        sx={{ marginBottom: '20px' }}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Confirm'}
      </Button>

      {categoryData.length > 0 ? (
        <PieChart
        height={300}
        series={[
          {
            data: chartData,
            innerRadius: radius,
            arcLabel: (params) => `${params.label} (${params.formattedValue})`, // Return as a simple string
            arcLabelMinAngle: 20,
            valueFormatter, // Ensure `valueFormatter` is formatted correctly as text
          },
        ]}
        skipAnimation={skipAnimation}
      />
    ) : (
      <Typography>No category data available</Typography>
    )}

      {/* <FormControlLabel
        checked={skipAnimation}
        control={<Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />}
        label="Skip Animation"
      /> */}

     </Box>
  );
}
