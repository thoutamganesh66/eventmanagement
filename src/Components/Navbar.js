import {useState, useEffect} from 'react'
import Cookie from 'js-cookie'
import {Link, Redirect} from 'react-router-dom';

import './navbar.css';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [redirect, setRedirect] = useState(false);
    const check = () => {
        if (Cookie.get('token') != null) {
            setIsAuthenticated(true)
        }
        else setIsAuthenticated(false)
    }
    useEffect(() => {
        check();
        console.log("isAuth", Cookie.get('token'), isAuthenticated)
    }, [])
    const handleButton = () => {
        console.log('jfljel');
        if (isAuthenticated) {
            Cookie.remove('token')
            setIsAuthenticated(false)
        }

    }


    return (
        <div className="color">
            <nav className="navbar navbar-light">
                <div className="container-fluid">
                    <Link to="/" style={{textDecoration: 'none', color: '#fff'}}><h5 className='title'>SGC Events</h5></Link>
                    <div className="d-flex mr-4">
                        <Link to="/" className="btn btn-light">Home</Link>
                        <Link to='/login' class="btn btn-light mr-2" onClick={handleButton}>{isAuthenticated ? 'logout' : 'login'}</Link>
                    </div>
                </div>
            </nav>
            {redirect ? <Redirect to='/' /> : <> </>}
        </div>
    );
}

export default Navbar;
