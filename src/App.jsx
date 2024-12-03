import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Registration/Registration';
import DashboardLayoutBasic from './pages/Dashboard/Dashboard';
import PrivateRoute from './Components/PrivateRoute';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute element={<DashboardLayoutBasic />} />} />
    </Routes>
  );
}
