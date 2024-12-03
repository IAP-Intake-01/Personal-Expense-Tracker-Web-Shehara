import React, { useState, useEffect } from 'react';
import { Home, PlusCircle, BarChart2, Calendar } from 'lucide-react';
import './SideBar.css';
import profile from '../../assets/profilepic.jpg';
import { jwtDecode } from 'jwt-decode'; // Correct import for named export


const Sidebar = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileName, setProfileName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // Decode the JWT token
        const decoded = jwtDecode(token);
        console.log('Decoded JWT:', decoded);

        const email = decoded.email;
        console.log('User Email:', email);

        // Fetch user profile data using email
        const response = await fetch(`http://localhost:3000/api/auth/user/${email}`);
        if (response.ok) {
          const [data] = await response.json(); // Assuming the API response is an array
          console.log('Fetched User Data:', data);

          // Concatenate first_name and last_name
          setProfileName(`${data.first_name} ${data.last_name}`);
        } else {
          console.error('Failed to fetch user profile.');
          setProfileName('Guest User'); // Fallback name
        }
      } catch (error) {
        console.error('Error decoding token or fetching user profile:', error);
        setProfileName('Guest User'); // Fallback name
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn('No JWT found in localStorage.');
      setProfileName('Guest User'); // Fallback name
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleNavigation = (tab) => {
    setActiveTab(tab); // Set the active tab for styling
    onTabChange(tab); // Notify parent component of the active tab change
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
                className="profilepic"
                onError={(e) => (e.target.src = {profile})}
              />
            </div>
            {/* Display profile name or loading state */}
            <h3 className="profile-name">
              {isLoading ? 'Loading...' : profileName}
            </h3>
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
