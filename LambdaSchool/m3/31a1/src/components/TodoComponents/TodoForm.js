import React from 'react';
import styled from 'styled-components';

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
	background: #7d387d;
	border-radius: 3px;
	border: 2px solid #e1d89f;
	color: #e1d89f;
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

const Div = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const fieldLength = {
	color: '#383651',
	fontSize: '1.5rem',
	width: '75%',
	margin: '0',
	padding: '0',
	backgroundColor: '#C45BAA',
	color: '#27474E'
};
class TodoForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<h2>Add a Todo:</h2>
				<form onSubmit={this.props.todoAdd}>
					<Div>
						<FormField>
							<Label>Title:</Label>
							<SCField>
								<input
									type="text"
									name="task"
									placeholder="...todo"
									value={this.state.addedTaskItem}
									onChange={this.props.todoChange}
									style={fieldLength}
								/>
							</SCField>
						</FormField>
					</Div>
					<ButtonRow>
						<Button type="button" onClick={this.props.todoAdd}>
							Add Todo
						</Button>
						<Button type="button" onClick={this.props.todoClear}>
							Clear Completed
						</Button>
					</ButtonRow>
				</form>
			</div>
		);
	}
}

export default TodoForm;
