import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Registration/Registration.css';
import Btn from '../../Common/Components/Button/Btn';
import CustomTextField from '../../Common/Components/CustomTextField/CustomTextField';
import DividerOr from '../../Common/Components/Divider/DivideOr';
import SocialMediaIcons from '../../Common/Components/SocialMediaIcons/SocialMediaIcons';
import TextWithLink from '../../Common/Components/TextWithLink/TextWithLink';
import logo from '../../assets/green logo.png';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const apiData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiData)
            });
            if (response.ok) {
                navigate('/dashboard');
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="register-page" style={{ height: 'auto' }}>
            <div className="Register-form">
                <img src={logo} alt="logo" style={{ width: '300px' }} />
                <h4>Register Now and Take Charge!</h4>
                <CustomTextField
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your First Name"
                    onChange={handleInputChange}
                />
                <CustomTextField
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your Last Name"
                    onChange={handleInputChange}
                />
                <CustomTextField
                    label="Username"
                    name="username"
                    placeholder="Enter your username"
                    onChange={handleInputChange}
                />
                <CustomTextField
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                />
                <CustomTextField
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                    type="password"  // Password masking
                />
                <CustomTextField
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Enter your password again"
                    onChange={handleInputChange}
                    type="password"  // Password masking
                />
                <Btn name="Sign Up" onClick={handleSubmit} />
                <DividerOr />
                <SocialMediaIcons />
                <TextWithLink text="Already have an account?" linkName="Login" url="/login" />
            </div>
        </div>
    );
}
