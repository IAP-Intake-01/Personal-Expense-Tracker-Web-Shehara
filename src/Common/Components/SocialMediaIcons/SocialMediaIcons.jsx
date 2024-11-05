import * as React from 'react';
import fbIcon from '../../../assets/fb.png';
import instaIcon from '../../../assets/insta.png';
import gmailIcon from '../../../assets/gmail.png';
import twitterIcon from '../../../assets/twitter.png'

export default function SocialMediaIcons() {
    return (
        <div>
            <img src={gmailIcon} alt="Facebook icon" style={{ width: '30px', margin: '0px 10px' }} />
            <img src={fbIcon} alt="Facebook icon" style={{ width: '30px', margin: '0px 10px' }} />
            <img src={instaIcon} alt="Facebook icon" style={{ width: '30px', margin: '0px 10px' }} />
            <img src={twitterIcon} alt="Facebook icon" style={{ width: '30px', margin: '0px 10px' }} />
        </div>
    )
}