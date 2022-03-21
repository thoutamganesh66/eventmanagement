import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Admin from './hocs/Admin';
import Event from './Components/Event';
import Navbar from './Components/Navbar';
import SignUp from './Components/signUp';
import axios from 'axios';

const App = () => {

	const [isAuthenticated, setisAuthenticated] = React.useState({status:false,isAdmin:false})
	let flag = false
	const main=async()=>{
		console.log("App js")
		let transport = axios.create({withCredentials:true});
		let res = await transport.post('http://localhost:5000/verifyuser')
		console.log(res.data)
		if(res.status == 200){
			setisAuthenticated({...isAuthenticated,status:true})
			return;
		}
		res = await transport.get('http://localhost:5000/admin/verifyadmin')
		console.log(res.data)
		if(res.status == 200){
			setisAuthenticated({...isAuthenticated,status:true,isAdmin:true})
			flag = true;
		}
	}

	React.useEffect(() => {
	  main()
	}, [])
	
	return(<Router>
		<Navbar setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated}/>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/login' >
				<Login setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated}/>
			</Route>
			<Route exact path='/admin'>
				<Admin isAdmin = {isAuthenticated.isAdmin}/>
			</Route>
			<Route exact path='/event' component={Event} />
			<Route exact path='/signup' component={SignUp} />
		</Switch>

	</Router>)};

export default App;