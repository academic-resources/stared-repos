import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import FriendsList from './components/FriendsList';
import PrivateRoute from './components/PrivateRoute';

function App() {
	return (
		<Router>
			<div className="App">
				{/*
				<ul>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/protected">FriendsList</Link>
					</li>
				</ul>
				*/}
				<Switch>
					<PrivateRoute path="/protected" component={FriendsList} />
					{/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
					<Route path="/login" component={Login} />
					<Route component={Login} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
