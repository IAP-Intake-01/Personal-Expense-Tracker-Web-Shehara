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

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(null);

        try {
            const response = await axios.post('/api/login', { username, password });
             

            if (response.ok) {
                const { token, userId } = response.data;
                localStorage.setItem('authToken', token);
                localStorage.setItem('userId', userId); // Store JWT in localStorage with a unique key
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
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
                    />
                    <CustomTextField
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
