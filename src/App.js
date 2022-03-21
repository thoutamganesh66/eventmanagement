import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Layout from './hocs/Layout';
import Admin from './hocs/Admin';
import Event from './Components/Event';


const App = () => {
	const [eventDetails, setEventDetails] = useState();

	const getEventDetails = (details) => {
		console.log(eventDetails)

		setEventDetails(details);
	}
	return (<Router>
		<Layout />
		<Switch>
			<Route exact path='/'>
				<Home getEventDetails={getEventDetails} />
			</Route>
			<Route exact path='/login' component={Login} />
			<Route exact path='/admin' component={Admin} />
			<Route exact path='/event'>
				<Event details={eventDetails} />
			</Route>
		</Switch>

	</Router>)
}

export default App;