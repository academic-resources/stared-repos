import React from 'react';

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<li
				style={
					this.props.completed ? { textDecoration: 'line-through', color: '#69BE28' } : { color: '#69BE28' }
				}
				onClick={() => this.props.toggleComplete(this.props.id)}
			>
				{this.props.item}, {this.props.dueDate}
			</li>
		);
	}
}

export default Todo;
