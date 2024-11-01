import * as React from 'react';

import Btn from '../../Common/Components/Button/Btn';
import { margin } from '@mui/system';
import CustomTextField from '../../Common/Components/CustomTextField/CustomTextField';
import DividerOr from '../../Common/Components/Divider/DivideOr';
import SocialMediaIcons from '../../Common/Components/SocialMediaIcons/SocialMediaIcons';
import TextWithLink from '../../Common/Components/TextWithLink/TextWithLink';

export default function Login() {
    return (
        <div className="login-page">
            <div className="carousel">
            </div>
            <div className="login-form" style={{ border: '1px solid white', margin: '10px', padding: '25px', borderRadius: '10px' }}>
                <h1>Login</h1>
                <CustomTextField label="Email" placeholder="Enter your email" />
                <CustomTextField label="Password" placeholder="Enter your password" />
                <Btn name={"Login"} path={"/dashboard"} />
                <DividerOr />
                <SocialMediaIcons />
                <TextWithLink text="Don't have an account?" linkName="Register" url="/register"/>
            </div>
        </div>
    );
}
