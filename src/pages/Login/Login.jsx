import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Btn from '../../Common/Components/Button/Btn';
import CustomTextField from '../../Common/Components/CustomTextField/CustomTextField';
import DividerOr from '../../Common/Components/Divider/DivideOr';
import SocialMediaIcons from '../../Common/Components/SocialMediaIcons/SocialMediaIcons';
import TextWithLink from '../../Common/Components/TextWithLink/TextWithLink';
import logo from '../../assets/green logo.png';
import Carousel from '../../Components/Carousel/Carousel';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(null);  // Reset error message

        try {
            // Send email and password to the backend for authentication
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });

            // Check if the response contains a valid token
            if (response.data && response.data.token) {
                // Store JWT token in localStorage (you can also store the email or other info if needed)
                localStorage.setItem('authToken', response.data.token);
                console.log(response.data.token);
                console.log(email, password);
                console.log('Navigating to dashboard...');
                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                setError('Invalid email or password');  // If no token is found in response
            }
        } catch (err) {
            console.error('Login error:', err.response || err.message || err);  // Log the error
            setError('Server error. Please try again later.');  // Display error message
        }
    };


    return (
        <div className="login">
            <div className="login-page">
                <div className="carousel">
                    <Carousel />
                </div>
                <div className="login-form">
                    <img src={logo} alt="logo" style={{ width: '300px' }} />
                    <h4>Login to Get Started</h4>
                    <CustomTextField
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"        // Add id
                        name="email"      // Add name
                        autoComplete="email" // Optional for autofill
                    />

                    <CustomTextField
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"     // Add id
                        name="password"   // Add name
                        autoComplete="current-password" // Optional for autofill
                    />
                    <Btn name="Login" onClick={handleLogin} />
                    {error && <p className="error">{error}</p>}
                    <DividerOr />
                    <SocialMediaIcons />
                    <TextWithLink text="Don't have an account?" linkName="Register" url="/register" />
                </div>
            </div>
        </div>
    );
}
