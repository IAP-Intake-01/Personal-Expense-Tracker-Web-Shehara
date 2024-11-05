import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Import close icon

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? drawerWidth : 0,
    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
}));

export default function NavigationBar({ open, handleDrawerToggle }) {
    const theme = useTheme();

    return (
        <AppBar position="fixed" open={open} style={{ backgroundColor: 'blue' }}>
            <Toolbar style={{ backgroundColor: 'blue' }}>
                <IconButton
                    color="blue"
                    aria-label="toggle drawer"
                    onClick={handleDrawerToggle} // Use the passed function
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }), // Hide menu icon when drawer is open
                    }}
                    disableRipple
                >
                    <MenuIcon />
                </IconButton>
                
                <Typography variant="h6" noWrap component="div" style={{ color:'white' }}>
                    Mini variant drawer
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
