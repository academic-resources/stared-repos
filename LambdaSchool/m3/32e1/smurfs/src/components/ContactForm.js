import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { fetchActivity } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { addSmurf } from '../actions';
import axios from 'axios';

let ContactForm = props => {
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [height, setHeight] = useState('');
	const [id, setID] = useState('');
	const [smurf, setNewSmurf] = useState({ name: '', age: '', height: '' });

	const handleSubmit = (event, values) => {
		event.preventDefault();
		axios
			.post('http://localhost:3333/smurfs', {
				name: name,
				age: age,
				height: height
			})
			.then(res => {
				console.log(res.data); // Data was created successfully and logs to console
			})
			.catch(err => {
				console.log(err); // There was an error creating the data and logs to console
			});
	};
	/*
	const {handleSubmit} = props;
	const [] = useState;
	
	function handleSubmit(e) {
		e.preventDefault();
		addSmurf(newSmurf);
		setMembersData(prevMembers => [...prevMembers, newSmurf]);
	}
*/
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Name: </label>
				<input type="text" name="name" onChange={event => setName(event.target.value)} />
			</div>
			<div>
				<label htmlFor="age">Age: </label>
				<input type="text" name="age" onChange={event => setAge(event.target.value)} />
			</div>
			<div>
				<label htmlFor="height">Height: </label>
				<input type="text" name="height" onChange={event => setHeight(event.target.value)} />
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

ContactForm = reduxForm({
	// a unique name for the form
	form: 'contact',
	fields: ['name', 'age', 'height']
})(ContactForm);

export default ContactForm;
