import {useState, useEffect} from 'react'
import Cookie from 'js-cookie'
import {Link, Redirect} from 'react-router-dom';

import './navbar.css';

const Navbar = ({isAuthenticated, setisAuthenticated}) => {
    const handleButton = () => {
        if (isAuthenticated) {
            Cookie.remove('token')
            setisAuthenticated({...isAuthenticated, status: false})
        }

    }


    return (
        <div className="color">
            <nav className="navbar navbar-light">
                <div className="container-fluid">
                    <Link to="/" style={{textDecoration: 'none', color: '#fff'}}><h5 className='title'>SGC Events</h5></Link>
                    <div className="d-flex mr-4">
                        <Link to="/" className="btn btn-light mr-3 nav-btn">Home</Link>
                        <Link to='/login' class="btn btn-light mr-2 nav-btn" onClick={(e) => handleButton()}>{isAuthenticated.status ? 'logout' : 'login'}</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
