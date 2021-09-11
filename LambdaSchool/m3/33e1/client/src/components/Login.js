import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Div = styled.div`
	background-color: #1c2826;
	width: 100%;
	margin: 2%;
	padding: 1%;
`;
const Input = styled.input`
	margin: 2%;
	padding: 1%;
	background-color: #d64550;
	color: #daefb3;
`;
const Form = styled.form`
	padding: 2%;
	margin: 2%;
	background-color: #1c2826;
`;
const H3 = styled.h3`
	padding: 1%;
	text-align: 'center';
	margin: 0.25%;
	background-color: #1c2826;
	color: #daefb3;
`;
class Login extends React.Component {
	state = {
		credentials: {
			username: '',
			password: ''
		}
	};

	handleChange = e => {
		this.setState({
			credentials: {
				...this.state.credentials,
				[e.target.name]: e.target.value
			}
		});
	};

	login = e => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/api/login', this.state.credentials)
			.then(res => {
				localStorage.setItem('token', res.data.payload);
				this.props.history.push('/protected');
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<Div>
				<H3>Log In To View Color List: </H3>
				<Form onSubmit={this.login}>
					<Input
						type="text"
						name="username"
						value={this.state.credentials.username}
						onChange={this.handleChange}
					/>
					<Input
						type="password"
						name="password"
						value={this.state.credentials.password}
						onChange={this.handleChange}
					/>
					<button>Log in</button>
				</Form>
			</Div>
		);
	}
}

export default Login;
