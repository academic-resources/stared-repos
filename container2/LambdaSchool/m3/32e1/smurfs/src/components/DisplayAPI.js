import React, { useState } from 'react';
import axios from 'axios';
import { fetchActivity, addSmurf, deleteSmurf } from '../actions';

var container = {
	width: '70%',
	textAlign: 'center',
	margin: '15%'
};

const DisplayAPI = props => {
	const [id, setID] = useState('');
	const handleSubmit = (event, props) => {
		event.preventDefault();
		console.log(id);
		axios
			.delete(`http://localhost:3333/smurfs/${id}`)
			.then(res => {
				console.log(res.data); // Data was created successfully and logs to console
			})
			.catch(err => {
				console.log(err); // There was an error creating the data and logs to console
			});
	};

	return (
		<div>
			<div style={container}>
				<h2>Name: {props.name}</h2>
				<h3>Age: {props.age}</h3>
				<h3>Height: {props.height}</h3>
				<form onSubmit={handleSubmit}>
					<button
						type="submit"
						name={props.id}
						id={`${props.id}`}
						label={`${props.id}`}
						onClick={event => setID(event.target.id)}
					>
						Delete {props.name}
					</button>
				</form>
			</div>
		</div>
	);
};

export default DisplayAPI;
