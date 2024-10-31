import * as React from 'react';
import '../Registration/Registration.css'
import Btn from '../../Common/Components/Button/Btn';
import { margin } from '@mui/system';
import CustomTextField from '../../Common/Components/CustomTextField/CustomTextField';
import DividerOr from '../../Common/Components/Divider/DivideOr';
import SocialMediaIcons from '../../Common/Components/SocialMediaIcons/SocialMediaIcons';
import TextWithLink from '../../Common/Components/TextWithLink/TextWithLink';
import logo from '../../assets/green logo.png';


export default function Register() {
    return (
        <div
            className="register-page"
            style={{height: 'auto', // Set height to full viewport height
                
            }}
        >
            <div
                className="Register-form"
                
            >
                <img src={logo} alt="logo" style={{ width: '300px' }} />
                <h4>Register Now and Take Charge!</h4>
                <CustomTextField label="First Name" placeholder="Enter your First Name" />
                <CustomTextField label="Last Name" placeholder="Enter your Last Name" />
                <CustomTextField label="Email" placeholder="Enter your email" />
                <CustomTextField label="Password" placeholder="Enter your password" />
                <CustomTextField label="Confirm Password" placeholder="Enter your password again" />
                <Btn name={"SignUp"} />
                <DividerOr />
                <SocialMediaIcons />
                <TextWithLink text="Already have an account?" linkName="Login" url="/login" />
            </div>
        </div>
    );
}
