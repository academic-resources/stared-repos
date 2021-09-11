import React, { useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
	background: #bb1333;
	border-radius: 3px;
	border: 2px solid #383651;
	color: #ffffff;
	font-weight: bold;
	margin: 0 1em;
	padding: 1em 2em;
`;

const LoginFormatting = styled.form`
	display: flex;
	color: #4c5962;
	font-weight: bold;
	margin: 1em;
	justify-content: center;
	align-items: center;
	width: 95%;
`;
const Div = styled.div`
	padding: 1em;
	display: flex;
	justify-content: center;
	width: 100%;
	flex-wrap: wrap;
`;

const H1 = styled.h1`
	color: #383651;
	font-size: 1rem;
`;
const FormField = styled.div`
	display: flex;
	width: 100%;
	justify-content: right;
	flex-wrap: nowrap;
	padding-top: 2%;
	padding-bottom: 2%;
	align-items: center;
`;
const Label = styled.label`
	width: 80%;
	margin: 0;
	padding: 0;
	justify-content: right;
	text-align: right;
	padding-right: 1%;
	text-decoration: none;
`;
const SCField = styled.div`
	width: 100%;
	margin: 0;
	padding: 0;
`;
const ButtonRow = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	justify-content: space-evenly;
	margin: 0;
	padding: 2%;
`;

const fieldLength = {
	width: '97%',
	margin: '0',
	padding: '0'
};

const UserForm = ({ values, errors, touched, isSubmitting, status }) => {
	const [sVisible, setSVisible] = useState(true);

	function toggleSVisible() {
		setSVisible(!sVisible);
	}

	function registerUser() {
		if (window.location.pathname === '/login') return null;
	}

	// hide login on clicking sign-up button
	if (window.location.pathname === '/login') return null;
	return (
		<Div>
			<H1>Register for an account to view and submit tickets:</H1>
			<LoginFormatting>
				<Form>
					{touched.name && errors.name && <p>{errors.name}</p>}
					{touched.username && errors.username && <p>{errors.username}</p>}
					{touched.email && errors.email && <p>{errors.email}</p>}
					{touched.password && errors.password && <p>{errors.password}</p>}
					{touched.cPassword && errors.cPassword && <p>{errors.cPassword}</p>}
					<div id="complete"></div>
					<FormField>
						<Label>Name:</Label>
						<SCField>
							<Field type="text" name="name" placeholder="Name" value={values.name} style={fieldLength} />
						</SCField>
					</FormField>
					<FormField>
						<Label>Slack Username:</Label>
						<SCField>
							<Field
								type="text"
								name="username"
								placeholder="Username"
								value={values.username}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Email Address:</Label>
						<SCField>
							<Field
								type="email"
								name="email"
								placeholder="Email"
								value={values.email}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Select Password:</Label>
						<SCField>
							<Field
								type="password"
								name="password"
								placeholder="Password"
								value={values.password}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Confirm Password:</Label>
						<SCField>
							<Field
								type="password"
								name="cPassword"
								placeholder="Confirm password"
								value={values.cPassword}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<ButtonRow>
						<Button type="submit" onClick={registerUser}>
							Sign up!
						</Button>
						<Link to="/">
							<Button type="submit" onClick={toggleSVisible}>
								Back To Log In
							</Button>
						</Link>
					</ButtonRow>
				</Form>
			</LoginFormatting>
		</Div>
	);
};

const FormikForm = withFormik({
	mapPropsToValues({ name, username, email, password, cPassword }) {
		return {
			name: name || '',
			username: username || '',
			email: email || '',
			password: password || '',
			cPassword: cPassword || ''
		};
	},
	// validation schema
	validationSchema: Yup.object().shape({
		name: Yup.string()
			.min(5, 'Name must be at least five characters.')
			.required('Name is required'),
		username: Yup.string()
			.min(5, 'Username must be at least five characters.')
			.required('Username is required'),
		email: Yup.string()
			.email('Email not valid')
			.required('Email is required'),
		password: Yup.string()
			.min(6, 'Password must be 6 characters or longer')
			.required('Password is required'),
		cPassword: Yup.string()
			.label('Confirm password')
			.required()
			.test('passwords-match', 'Passwords must match.', function(value) {
				return this.parent.password === value;
			})
	}),

	handleSubmit(values, { setStatus, resetForm, setErrors, setSubmitting }) {
		axios
			.post('https://devdesk2eli.herokuapp.com/api/register', values)
			.then(res => {
				console.log('login response = ' + res.data);
				setStatus(res.data);
				resetForm();
				setSubmitting(false);
				document.getElementById('complete').textContent =
					'Your profile has been created, and you may log in now.';
			})
			.catch(err => {
				console.log(err);
				setSubmitting(false);
			});
	}
})(UserForm);

export default FormikForm;
