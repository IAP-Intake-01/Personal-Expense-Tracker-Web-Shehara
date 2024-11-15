import React, { useState, useEffect } from 'react';
import { Home, PlusCircle, BarChart2, Calendar } from 'lucide-react';
import './SideBar.css';
import profile from '../../assets/profilepic.jpg';
import { jwtDecode } from 'jwt-decode'; // Correct import for named export

const Sidebar = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileName, setProfileName] = useState('');

  // Function to fetch user data from the API
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('user_jwt');
    if (token) {
      try {
        // Decode the JWT token to get user ID or other information
        const decoded = jwtDecode(token); // Correct usage of jwtDecode
        const userId = decoded.userId; // Adjust based on your JWT structure

        // Call your API to fetch user details using the userId
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        const data = await response.json();

        // Assuming the response has 'first_name' and 'last_name' fields
        if (data) {
          setProfileName(`${data.first_name} ${data.last_name}`);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleNavigation = (tab) => {
    setActiveTab(tab); // Set the active tab for styling
    onTabChange(tab); // Notify DashboardLayoutBasic of the active tab change
  };

  return (
    <div className="flex h-screen bg-gray-100 main">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="flex flex-col items-center">
            <div className="profile-picture">
              <img
                src={profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Display profile name here */}
            <h3 className="profile-name">{profileName || 'Loading...'}</h3>
            <p className="profile-balance">$5,240</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 nav">
          <button
            onClick={() => handleNavigation('dashboard')}
            className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <Home className="nav-icon" />
            Dashboard
          </button>

          <button
            onClick={() => handleNavigation('addExpense')}
            className={`nav-button ${activeTab === 'addExpense' ? 'active' : ''}`}
          >
            <PlusCircle className="nav-icon" />
            Add Expense
          </button>

          <button
            onClick={() => handleNavigation('monthlySummary')}
            className={`nav-button ${activeTab === 'monthlySummary' ? 'active' : ''}`}
          >
            <BarChart2 className="nav-icon" />
            Monthly Summary
          </button>

          <button
            onClick={() => handleNavigation('yearlySummary')}
            className={`nav-button ${activeTab === 'yearlySummary' ? 'active' : ''}`}
          >
            <Calendar className="nav-icon" />
            Yearly Summary
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
