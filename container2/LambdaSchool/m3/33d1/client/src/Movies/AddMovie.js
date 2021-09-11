import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { fetchActivity } from '../actions';
// import { addFriend } from '../actions';
import axios from 'axios';
import styled from 'styled-components';

var container = {
	width: '95%',
	textAlign: 'center',
	margin: '2%'
};

const Div = styled.div`
	background-color: #1c2826;
	width: 95%;
	margin: 2%;
	padding: 1%;
`;
const Input = styled.input`
	margin: 2%;
	padding: 1%;
	background-color: #d64550;
	color: #1c2826;
`;
const Form = styled.form`
	width: '95%';
	text-align: 'center';
	padding: 2%;
	margin: 2%;
	background-color: #1c2826;
`;

const H2 = styled.h2`
	padding: 1%;
	text-align: 'center';
	background-color: #d64550;
	color: #1c2826;
`;
const H3 = styled.label`
	padding: 1%;
	text-align: 'center';
	margin: 0.25%;
	background-color: #1c2826;
	color: #daefb3;
`;
const Button = styled.button`
	padding: 1%;
	text-align: 'center';
	margin-left: 25%;
	margin-bottom: 5%;
	background-color: #d64550;
	color: #1c2826;
	border: 3px solid #daefb3;
`;

let ContactForm = props => {
	const [title, setTitle] = useState('');
	const [metascore, setMetascore] = useState('');
	const [director, setDirector] = useState('');
	const [stars, setStars] = useState([]);
	const [id, setID] = useState('');
	const [movie, setNewMovie] = useState({ title: '', metascore: '', director: '', stars: [] });

	const handleSubmit = (event, values) => {
		event.preventDefault();
		axios
			.post('http://localhost:5000/api/movies', {
				title: title,
				metascore: metascore,
				director: director,
				stars: stars
			})
			.then(res => {
				console.log(res.data);
				props.setMovies(res.data);
				props.history.push(`/api/movies/${id}`);
				props.history.goBack();
				props.history.goBack();
			})
			.catch(err => {
				console.log(err); // There was an error creating the data and logs to console
			});
	};
	const formatStars = props => {
		setStars();
	};
	return (
		<Form onSubmit={handleSubmit}>
			<H2>Enter a Friend:</H2>
			<Div>
				<H3 htmlFor="title">Title: </H3>
				<Input type="text" name="title" onChange={event => setTitle(event.target.value)} />
			</Div>
			<Div>
				<H3 htmlFor="metascore"> Metascore: </H3>
				<Input type="number" name="metascore" onChange={event => setMetascore(event.target.value)} />
			</Div>
			<Div>
				<H3 htmlFor="director">Director: </H3>
				<Input type="text" name="director" onChange={event => setDirector(event.target.value)} />
			</Div>
			<Div>
				<H3 htmlFor="stars">Stars: </H3>
				<Input type="text" name="stars" onChange={event => setStars(event.target.value.split(','))} />
			</Div>
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default ContactForm;
