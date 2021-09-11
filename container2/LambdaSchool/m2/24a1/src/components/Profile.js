import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import { useInput } from './CustomHooks/InputHook'
import styled from 'styled-components';
import loadForm from './old pages/Form.js';

const Button = styled.button`
	background: #bb1333;
	border-radius: 3px;
	border: 2px solid #383651;
	color: #ffffff;
	font-weight: bold;
	margin: 1em;
	padding: 1em 2em;
`;

const H1 = styled.h1`
	color: #383651;
	font-size: 2.5rem;
	margin-left: 3%;
	width: 100%;
	justify-content: center;
	text-align: center;
`;
const FormField = styled.div`
	display: flex;
	width: 100%;
	justify-content: right;
	flex-wrap: nowrap;
`;
const Div = styled.div`
	width: 60%;
	display: flex;
	flex-wrap: wrap;
	justify-content: right;
	margin-left: 15%;
`;
const Label = styled.label`
	width: 30%;
	margin: 0;
	padding: 0;
	justify-content: right;
	text-align: right;
	padding-right: 1%;
`;

const SCField = styled.div`
	width: 100%;
	margin: 0;
	padding: 0;
`;
const Center = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
	margin: 0;
	padding: 0;
`;

const fieldLength = {
	width: '100%',
	margin: '0',
	padding: '0'
};
const Profile = ({ profile, values, errors, touched, status }) => {
	// TODO: 3 Not only are standard network request techniques employed, the code is organized in such a fashion that the student demonstrated proper use of container vs presentational components or other industry standards, conventions or patterns.

	// TODO: 3 Student showed great insight in setting up the state management for the app's forms.
	// TODO: 2 proper usage of state and props are demonstrated throughout the project
	// TODO: 2 proper usage of useState and useEffect hooks are clearly incorporated and correctly implemented.

	// TODO: 3 Student incorporated a third party event/animation library like unto Greensock, Anime, React-motion etc.
	// TODO: 2 Student used Array methods to dynamically render HTML elements.
	// TODO: 3 Loading states and success/error notifications are in place and add to the overall UX of the app.
	// TODO: 3 Student used advanced React techniques like the composition pattern, custom hooks, render props, HOCs, etc.

	// TODO: 3 Student was able to architect components to be easily reused.
	// TODO: 2 Student created functional components and used events in application to add dynamic functionality to app.
	// TODO: 2 the UI is composed of small reusable components
	// TODO: 2 Student's code was organized at the component level
	// TODO: 2 Student has set up component management for the forms in the app that makes sense for each form.

	// fields: name, username, email, change password, usertype display, save button for acct changes

	console.log('profile profile = ' + profile.username);
	values.name = profile.name;
	values.username = profile.username;
	values.usertype = profile.usertype;
	values.email = profile.email;
	values.password = profile.password;

	function updateProfile(profile, values, event) {
		console.log(profile.id);
		console.log(values);
		console.log(profile);
		profile = values;
		let url = `https://devdesk2eli.herokuapp.com/api/users/${profile.id}`;
		axios.defaults.headers.common['Content-Type'] = 'application/json';
		axios
			.put(url, profile)
			.then(res => {
				console.log('res = ' + res);
			})
			.catch(err => {
				console.log(err); // logs error creating the data
			});
	}
	// TODO: Profile page displaying fields
	return (
		<Center>
			<H1>Profile Information:</H1>
			<Form>
				<Div>
					{touched.name && errors.name && <p>{errors.name}</p>}
					{touched.username && errors.username && <p>{errors.username}</p>}
					{touched.email && errors.email && <p>{errors.email}</p>}
					{touched.password && errors.password && <p>{errors.password}</p>}
					<FormField>
						<Label>User Type:</Label>
						<SCField>
							<Field
								type="text"
								name="usertype"
								placeholder={profile.usertype}
								value={values.usertype}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Name:</Label>
						<SCField>
							<Field
								type="text"
								name="name"
								placeholder={profile.name}
								value={values.name}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Slack Username:</Label>
						<SCField>
							<Field
								type="username"
								name="username"
								placeholder={profile.username}
								value={values.username}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Email:</Label>
						<SCField>
							<Field
								type="email"
								name="email"
								placeholder={profile.email}
								value={values.email}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Password:</Label>
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
					<Button type="submit" onClick={event => updateProfile(profile, values, event)}>
						Save
					</Button>
					{touched.password && errors.password && <p>{errors.password}</p>}
				</Div>
			</Form>
		</Center>
	);
};

// TODO: 2 Some form validation is in place.
// TODO: 3 Form validation is in place for all fields, and covers all use cases.
// TODO: 2 Student made the decision to use a third-party library, like Formik, or not, and can defend their decision.

const FormikForm = withFormik({
	mapPropsToValues({ name, username, email, password }) {
		return {
			name: name || '',
			username: username || '',
			email: email || '',
			password: password || ''
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
			.required('Password is required')
	}),

	// TODO: 2 Student implemented GET requests using either Axios or Fetch to display 3rd party data on a deployed page.
	// TODO: axios get request or parse response
	handleSubmit(values, { setStatus, resetForm, setErrors, setSubmitting }) {
		axios
			.get('https://devdesk2eli.herokuapp.com/api/users?email=' + values.email, values)
			.then(res => {
				console.log('login response = ' + res.data); // Data was created successfully and logs to console
				setStatus(res.data);
				resetForm();
				setSubmitting(false);
				loadForm();
			})
			.catch(err => {
				console.log(err); // logs error creating the data
				setSubmitting(false);
			});
	}
})(Profile);

export default FormikForm;
