import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

// Requirements:
// 1. It has the same API as <Route />. (same props as Route)
// 2. It renders a <Route /> and passes all the props through to it.
// 3. It checks if the user is authenticated, if they are, it renders
// the “component” prop. If not, it redirects the user to /login.

const paddingStyle = {
	width: '100%',
	marginTop: '3%',
	padding: '5%',
	backgroundColor: '#1c2826'
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (localStorage.getItem('token')) {
					return <Component {...props} />;
				} else {
					return <Redirect to="/login" />;
				}
			}}
			style={paddingStyle}
		/>
	);
};

export default PrivateRoute;
