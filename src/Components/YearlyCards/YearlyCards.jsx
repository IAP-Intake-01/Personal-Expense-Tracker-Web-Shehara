import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Make sure to install jwt-decode: `npm install jwt-decode`

const YearlySummaryCards = () => {
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

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
      {data.groupedData.map((yearData, index) => (
        <div
          key={yearData.year}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            width: '300px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ textAlign: 'center', margin: '0 0 16px 0' }}>Year: {yearData.year}</h3>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
            {data.categories.map((category, i) => (
              <li
                key={category}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <span>{category}</span>
                <span>Rs. {parseFloat(yearData.totals[i]).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default YearlySummaryCards;
