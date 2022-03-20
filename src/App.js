import React from 'react';
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Layout from './hocs/Layout';
import Admin from './hocs/admin.js';
// import Admin from './hocs/Admin'
import Event from './Components/event'
const App = () => (
    <Router>
        <Layout />
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/event' component={Event} />
        </Switch>

    </Router>
);

export default App;
