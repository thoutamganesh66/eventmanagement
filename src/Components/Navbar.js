import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link, Redirect } from 'react-router-dom';

import { useState } from 'react';
import './navbar.css';

const Navbar = () => {

    const [redirect, setRedirect] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // const logout_user = () => {
    //     logout();
    //     setRedirect(true);
    // }
    const guestLinks = () => (

        <>
            <Link to="/login" className="btn btn-light">Login</Link>
            {/* <Link to="/signup" class="btn btn-light mr-2">Sign Up</Link> */}
        </>
    );

    // const authLinks = () => (
    //     <>
    //         <a href='/' class="btn btn-light mr-2" onClick={logout_user}>Logout</a>
    //     </>
    // );

    return (
        <div className="color">
            <nav className="navbar navbar-light">
                <div className="container-fluid">
                    <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}><h5 className='title'>SGC Events</h5></Link>
                    <div className="d-flex mr-4">
                        <Link to="/" className="btn btn-light">Home</Link>
                        {isAuthenticated ? guestLinks() : guestLinks()}
                    </div>
                </div>
            </nav>
            {redirect ? <Redirect to='/' /> : <> </>}
        </div>
        // <Box sx={{ flexGrow: 1 }}>
        //     <AppBar position="static">
        //         <Toolbar className='navtabs'>
        //             {/* <IconButton
        //                 size="large"
        //                 edge="start"
        //                 color="inherit"
        //                 aria-label="menu"
        //                 sx={{ mr: 2 }}
        //             >
        //                 <MenuIcon />
        //             </IconButton> */}
        //             <Button variant="filled" href="/">
        //                 SGC Arts Panel
        //             </Button>
        //             <Button variant="filled" href="/login">
        //                 Login
        //             </Button>
        //             <Button variant="filled" href="/admin">
        //                 Admin
        //             </Button>
        //         </Toolbar>
        //     </AppBar>
        // </Box >
    );
}

export default Navbar;