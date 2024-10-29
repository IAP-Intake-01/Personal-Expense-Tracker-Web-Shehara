import * as React from 'react';

import Btn from '../../Common/Components/Button/Btn';
import { margin } from '@mui/system';
import CustomTextField from '../../Common/Components/CustomTextField/CustomTextField';
import DividerOr from '../../Common/Components/Divider/DivideOr';
import SocialMediaIcons from '../../Common/Components/SocialMediaIcons/SocialMediaIcons';
import TextWithLink from '../../Common/Components/TextWithLink/TextWithLink';

export default function Register() {
    return (
        <div className="register-page">
            
            <div className="Register-form" style={{ border: '1px solid white', margin: '10px', padding: '25px', borderRadius: '10px' }}>
                <h1>Register</h1>
                <CustomTextField label="First Name" placeholder="Enter your First Name" />
                <CustomTextField label="Last Name" placeholder="Enter your Last Name" />
                <CustomTextField label="Email" placeholder="Enter your email" />
                <CustomTextField label="Password" placeholder="Enter your password" />
                <CustomTextField label="Confirm Password" placeholder="Enter your password again" />
                <Btn name={"SignUp"} />
                <DividerOr />
                <SocialMediaIcons />
                <TextWithLink text="Already have an acoount?" linkName="Login" url="/login"/>
            </div>
        </div>
    );
}
