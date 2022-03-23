import {useState, useEffect} from 'react'
import Cookie from 'js-cookie'
import './App.css'
import Alert from '@mui/material/Alert'
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Admin from './hocs/Admin';
import Event from './Components/Event';
import Navbar from './Components/Navbar';
import SignUp from './Components/signUp';
import axios from 'axios';
import ForgotPassword from './Components/forgotpassword'
const App = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState({status: false, isAdmin: false})
    const main = async () => {
        let transport = axios.create({withCredentials: true});
        console.log("App js", Cookie.get('token'))
        let res = await transport.post('http://192.168.30.5:5000/verifyuser')
        console.log(res.data)
        if (res.status == 200) {
            setisAuthenticated({...isAuthenticated, status: true})

            return;
        }
        res = await transport.get('http://192.168.30.5:5000/admin/verifyadmin')
        console.log(res.data)
        if (res.status == 200) {
            setisAuthenticated({...isAuthenticated, status: true, isAdmin: true})
        }

    }

    useEffect(() => {
        main()
    }, [])

    return (
        <Router>
            <Navbar setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated} />
            {error ? <Alert onClose={() => {setError(null)}} className='error' variant="filled" severity="error">
                {error}            </Alert> : <></>}

            {success ? <Alert onClose={() => {setSuccess(null)}} className='success' variant="filled" severity="success">
                {success}            </Alert> : <></>}
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' >
                    <Login setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated} error={error} setError={setError} />
                </Route>
                <Route exact path='/admin'>
                    <Admin isAdmin={isAuthenticated.isAdmin} />
                </Route>
                <Route exact path='/event' component={Event} />
                <Route exact path='/signup'>
                    <SignUp error={error} setError={setError} success={success} setSuccess={setSuccess} />
                </Route>

                <Route exact path='/resetpassword' >
                    <ForgotPassword error={error} setError={setError} setSuccess={setSuccess} />
                </Route>
            </Switch>

        </Router>)
};

export default App;
