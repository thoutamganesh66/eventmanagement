import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Layout from './hocs/Layout';
import Admin from './hocs/Admin';

const App = () => (
	<Router>
		<Layout />
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/admin' component={Admin} />
		</Switch>

	</Router>
);

export default App;