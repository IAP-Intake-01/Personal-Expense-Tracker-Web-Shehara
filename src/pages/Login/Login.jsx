import React from 'react';
import './Login.css';
import Btn from '../../Common/Components/Button/Btn';
import CustomTextField from '../../Common/Components/CustomTextField/CustomTextField';
import DividerOr from '../../Common/Components/Divider/DivideOr';
import SocialMediaIcons from '../../Common/Components/SocialMediaIcons/SocialMediaIcons';
import TextWithLink from '../../Common/Components/TextWithLink/TextWithLink';
import logo from '../../assets/green logo.png';
import Carousel from '../../Components/Carousel/Carousel';

export default function Login() {
    return (
        <div className="login-page">
            <div className="carousel">
                <Carousel />
            </div>
            <div className="login-form">
                <img src={logo} alt="logo" style={{ width: '300px' }} />
                <h4>Login to Get Started</h4>
                <CustomTextField label="Email" placeholder="Enter your email" />
                <CustomTextField label="Password" placeholder="Enter your password" />
                <Btn name={"Login"} path={"/dashboard"} />
                <DividerOr />
                <SocialMediaIcons />
                <TextWithLink text="Don't have an account?" linkName="Register" url="/register" />
            </div>
        </div>
    );
}
