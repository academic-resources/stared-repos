import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import loadForm from './Hide.js';

const Div1 = styled.div`
	width: 70%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding-top: 2%;
	padding-bottom: 2%;
	margin: 0;
	border-bottom: 2px solid #383651;
	border-top: 2px solid #383651;
`;
const H1 = styled.h1`
	color: #383651;
	font-size: 2.5rem;
	width: 100%;
	justify-content: center;
	text-align: center;
`;
const Div = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;
const FormField = styled.div`
	display: flex;
	width: 100%;
	justify-content: right;
	flex-wrap: nowrap;
`;
const Label = styled.label`
	width: 40%;
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
const Button = styled.button`
	background: #bb1333;
	border-radius: 3px;
	border: 2px solid #383651;
	color: #ffffff;
	font-weight: bold;
	margin: 1em;
	padding: 1em 2em;
`;
const ButtonRow = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	justify-content: space-evenly;
	margin: 0;
	padding: 0;
`;

const fieldLength = {
	width: '97%',
	margin: '0',
	padding: '0'
};

const Ticket = ({ ticket, values, errors, touched, isSubmitting, status }) => {
	values.title = ticket.title;
	values.date = ticket.date;
	console.log(values.date);
	console.log(values.date);
	values.category = ticket.category;
	values.statusT = ticket.status;
	values.description = ticket.description;

	function updateTicket(ticket, values, event) {
		ticket = values;
		let url = `https://devdesk2eli.herokuapp.com/api/tickets/${ticket.id}`;
		axios.defaults.headers.common['Content-Type'] = 'application/json';
		axios
			.put(url, ticket)
			.then(res => {
				console.log('res = ' + res);
			})
			.catch(err => {
				console.log(err); // logs error creating the data
			});
	}
	return (
		<Div1>
			<H1>Ticket:</H1>
			<Form>
				<Div>
					{touched.title && errors.title && <p>{errors.title}</p>}
					{touched.date && errors.date && <p>{errors.date}</p>}
					{touched.category && errors.category && <p>{errors.category}</p>}
					{touched.statusT && errors.statusT && <p>{errors.statusT}</p>}
					{touched.description && errors.description && <p>{errors.description}</p>}
					<FormField>
						<Label>Title:</Label>
						<SCField>
							<Field
								type="text"
								name="title"
								placeholder={ticket.title}
								value={values.title}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Date Submitted:</Label>
						<SCField>
							<Field
								type="text"
								name="date"
								placeholder={ticket.date}
								value={values.date}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Category:</Label>
						<SCField>
							<Field
								type="text"
								name="category"
								placeholder={ticket.category}
								value={values.category}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>Status:</Label>
						<SCField>
							<Field
								type="text"
								name="statusT"
								placeholder={ticket.statusT}
								value={values.statusT}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<FormField>
						<Label>What You Tried:</Label>
						<SCField>
							<Field
								type="text"
								name="description"
								placeholder={ticket.description}
								value={values.description}
								style={fieldLength}
							/>
						</SCField>
					</FormField>
				</Div>
				<ButtonRow>
					<Button type="submit" onClick={event => updateTicket(ticket, values, event)}>
						Save
					</Button>
				</ButtonRow>
			</Form>
		</Div1>
	);
};

// TODO: 2 Some form validation is in place.
// TODO: 3 Form validation is in place for all fields, and covers all use cases.
// TODO: 2 Student made the decision to use a third-party library, like Formik, or not, and can defend their decision.
const FormikForm = withFormik({
	mapPropsToValues({ submitid, date, title, category, statusT, description }) {
		return {
			submitid: submitid || '',
			date: date || '',
			title: title || '',
			category: category || '',
			statusT: statusT || '',
			description: description || ''
		};
	},
	// validation schema
	validationSchema: Yup.object().shape({
		title: Yup.string()
			.min(2, 'Title must be two characters or longer.')
			.required('Title is required'),
		category: Yup.string()
			.min(2, 'Category must be two characters or longer.')
			.required('Category is required'),
		description: Yup.string()
			.min(6, 'Description must be 6 characters or longer')
			.required('Description is required')
	}),

	// TODO: 2 Student implemented GET requests using either Axios or Fetch to display 3rd party data on a deployed page.
	// TODO: axios get request or parse response
	handleSubmit(values, { setStatus, resetForm, setErrors, setSubmitting }) {
		axios
			.get(`https://devdesk2eli.herokuapp.com/api/tickets/${values.submitid}`, values)
			.then(res => {
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
})(Ticket);

export default FormikForm;
