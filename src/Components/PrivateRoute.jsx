import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check for token
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
