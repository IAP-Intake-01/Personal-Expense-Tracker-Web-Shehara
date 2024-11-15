import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Registration/Registration';
import DashboardLayoutBasic from './pages/Dashboard/Dashboard';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('user_jwt');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <DashboardLayoutBasic /> : <Login />} />
      <Route path="/login" element={isAuthenticated ? <DashboardLayoutBasic /> : <Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Route for Dashboard */}
      <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<DashboardLayoutBasic />} />} />
    </Routes>
  );
}

export default App;
