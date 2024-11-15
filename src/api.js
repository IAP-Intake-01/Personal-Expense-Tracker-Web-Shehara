// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Change this to match your backend URL

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getEntries = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/entries/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching entries:', error);
    throw error;
  }
};


