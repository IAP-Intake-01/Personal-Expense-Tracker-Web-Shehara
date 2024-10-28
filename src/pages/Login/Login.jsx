import * as React from 'react';
import { Box, Divider, Typography, FormLabel, Button, Input } from '@mui/joy';
import fbIcon from '../../assets/fb.png';
import instaIcon from '../../assets/insta.png';
import gmailIcon from '../../assets/gmail.png';
import twitterIcon from '../../assets/twitter.png';
import { margin } from '@mui/system';

export default function Login() {
    return (
        <div className="login-page">
            <div className="carousel">
                {/* Carousel content goes here */}
            </div>
            <div className="login-form" style={{ border:'1px solid white', margin:'10px', padding:'25px', borderRadius:'10px'}}>
                <h1>Login</h1>
                
                <FormLabel style={{ color:'white', margin:'5px 0px' }}>Email</FormLabel>
                <Input placeholder="Enter your email" />
                
                <FormLabel style={{ color:'white', margin:'5px 0px' }}>Password</FormLabel>
                <Input placeholder="Enter your password" type="password" />
                
                <Button variant="solid" color="primary" style={{ marginTop: '20px' }}>
                    Log In
                </Button>

                <Box display="flex" alignItems="center" my={2} style={{ marginTop:'30px' }}>
                    <Divider style={{ flexGrow: 1 }} />
                    <Typography variant="body2" color="textSecondary" style={{ marginTop:'-12px' }}>
                        OR
                    </Typography>
                    <Divider style={{ flexGrow: 1 }} />
                </Box>

                {/* Social Media Icon */}
                <img src={gmailIcon} alt="Facebook icon" style={{ width: '30px', margin: '10px' }} />
                <img src={fbIcon} alt="Facebook icon" style={{ width: '30px', margin: '10px' }} />
                <img src={instaIcon} alt="Facebook icon" style={{ width: '30px', margin: '10px' }} />
                <img src={twitterIcon} alt="Facebook icon" style={{ width: '30px', margin: '10px' }} />
                
                {/* <p>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: 'blue', textDecoration: 'none' }}>
                    Register
                </Link>
            </p> */}
            <p>
                Don't have an account?{' '}
                <a href="/register" style={{ color: 'cyan', textDecoration: 'none' }}>
                    Register
                </a>
            </p>
            </div>
        </div>
    );
}
