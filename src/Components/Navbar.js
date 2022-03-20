import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar className='navtabs'>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Button  >
                        <Link to='/' style={{textDecoration: 'inherit', color: 'white'}} > SGC Arts Panel</Link>
                    </Button>
                    <Button >
                        <Link to='/login' style={{textDecoration: 'inherit', color: 'white'}}>Login</Link>
                    </Button>
                    <Button >
                        <Link to='/admin' style={{textDecoration: 'inherit', color: 'white'}}>Admin</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default Navbar;
