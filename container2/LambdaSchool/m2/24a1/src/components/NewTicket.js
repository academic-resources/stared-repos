import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useInput } from './InputHook.js';
import styled from 'styled-components';

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
	width: 100%;
	color: #383651;
	font-size: 2.5rem;
	margin-left: 3%;
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
	width: 90%;
	display: flex;
	flex-wrap: wrap;
	justify-content: right;
	margin-left: 5%;
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
const Div1 = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: right;
	margin-right: 5%;
`;

const fieldLength = {
	width: '95%',
	margin: '0',
	padding: '0'
};

const Ticket = ({
	profile,
	currentUserID,
	values,
	errors,
	touched,
	isSubmitting,
	status,
	setSearchResults,
	setTickets
}) => {
	const { value: tickets, hook: bindTickets } = useInput('');

	return (
		<Center>
			<H1>Submit a New Ticket:</H1>
			<Form>
				<Div>
					{touched.title && errors.title && <p>{errors.title}</p>}
					{touched.date && errors.date && <p>{errors.date}</p>}
					{touched.category && errors.category && <p>{errors.category}</p>}
					{touched.statusT && errors.statusT && <p>{errors.statusT}</p>}
					{touched.description && errors.description && <p>{errors.description}</p>}
					<div id="complete"></div>
					<FormField>
						<Label>Title:</Label>
						<SCField>
							<Field
								type="text"
								name="title"
								placeholder="ticket title"
								value={values.title}
								width="100%"
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
								placeholder="category of problem"
								value={values.category}
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
								placeholder="What have you tried?"
								value={values.description}
								width="100%"
								style={fieldLength}
							/>
						</SCField>
					</FormField>
					<Div1>
						<Button type="submit">Save</Button>
					</Div1>
				</Div>
			</Form>
		</Center>
	);
};

const FormikForm = withFormik({
	mapPropsToValues({ profile, submitid, date, title, category, statusT, description }) {
		console.log(profile.id);
		const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
		return {
			title: title || '',
			date:
				new Date().toLocaleDateString('en-US', dateOptions) ||
				new Date().toLocaleDateString('en-US', dateOptions),
			category: category || '',
			status: 'queue' || 'queue',
			description: description || '',
			submitid: profile.id || profile.id,
			helperid: '' || '',
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

	async handleSubmit(
		values,
		{ submitid, currentUserID, setSearchResults, setTickets, setStatus, resetForm, setErrors, setSubmitting }
	) {
		await axios
			.post('https://devdesk2eli.herokuapp.com/api/tickets/', values)
			.then(res => {
				console.log('login response = ' + res.data);
				setStatus(res.data);
				document.getElementById('complete').textContent = 'Your ticket has been submitted.';
				resetForm();
				setSubmitting(false);
			})
			.catch(err => {
				console.log(err);
				setSubmitting(false);
			});

		let url = `https://devdesk2eli.herokuapp.com/api/tickets/${values.submitid}`;
		console.log(url);
		await axios
			.get(url)
			.then(res => {
				console.log('form response = ');
				console.log(res.data);
				console.log('form tickets = ' + res.data);

				setTickets(res.data);
				setSearchResults(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}
})(Ticket);

export default FormikForm;
