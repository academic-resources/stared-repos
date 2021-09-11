import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

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
	const [name, setName] = useState('');
	const [hex, setHex] = useState('');

	const handleSubmit = (event, values) => {
		event.preventDefault();
		axiosWithAuth()
			.post('http://localhost:5000/api/colors', {
				color: name,
				code: { hex: hex }
			})
			.then(res => {
				console.log(res.data);
				window.location.href = '/protected';
			})
			.catch(err => {
				console.log(err);
			});
	};
	return (
		<Form onSubmit={handleSubmit}>
			<H2>Enter a Color:</H2>
			<Div>
				<H3 htmlFor="name">Name: </H3>
				<Input type="text" name="name" onChange={event => setName(event.target.value)} />
			</Div>
			<Div>
				<H3 htmlFor="hex">Hex: </H3>
				<Input type="text" name="hex" onChange={event => setHex(event.target.value)} />
			</Div>
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default ContactForm;
