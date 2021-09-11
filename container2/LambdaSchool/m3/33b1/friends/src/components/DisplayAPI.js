import React, { useState } from 'react';
import axios from 'axios';
import { fetchActivity, addSmurf, deleteSmurf } from '../actions';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

var container = {
	width: '95%',
	textAlign: 'center',
	margin: '2%'
};

const Div = styled.div`
	padding: 1%;
	background-color: #d64550;
	color: #1c2826;
`;

const H2 = styled.h2`
	padding: 1%;
	background-color: #d64550;
	color: #1c2826;
`;
const H3 = styled.h3`
	padding: 1%;
	background-color: #d64550;
	color: #eef4d4;
`;
const H4 = styled.h4`
	padding: 1%;
	background-color: #d64550;
	color: #ea9e8d;
`;
const Button = styled.button`
	padding: 1%;
	text-align: 'center';
	margin-left: 25%;
	margin-bottom: 5%;
	background-color: #1c2826;
	color: #d64550;
	border: 3px solid #daefb3;
`;

const DisplayAPI = props => {
	const [id, setID] = useState('');
	const handleSubmit = (event, props) => {
		event.preventDefault();
		console.log(id);
		axiosWithAuth()
			.delete(`http://localhost:5000/api/friends/${id}`)
			.then(res => {
				console.log(res.data); // Data was created successfully and logs to console
			})
			.catch(err => {
				console.log(err); // There was an error creating the data and logs to console
			});
	};

	return (
		<Div>
			<Div style={container}>
				<H2>Name: {props.name}</H2>
				<H3>Age: {props.age}</H3>
				<H4>Email: {props.email}</H4>
				<form onSubmit={handleSubmit}>
					<Button
						type="submit"
						name={props.id}
						id={`${props.id}`}
						label={`${props.id}`}
						onClick={event => setID(event.target.id)}
					>
						Delete {props.name}
					</Button>
				</form>
			</Div>
		</Div>
	);
};

export default DisplayAPI;
