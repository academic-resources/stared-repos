import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import styled from 'styled-components';

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
