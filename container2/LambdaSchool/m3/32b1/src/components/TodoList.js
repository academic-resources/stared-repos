import React from 'react';
import Todo from './Todo.js';

class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<h2>Click to Complete a Todo:</h2>
				<ul>
					{this.props.tasks.map(todoItem => (
						<Todo
							key={todoItem.id}
							toggleComplete={this.props.toggleComplete}
							item={todoItem.item}
							completed={todoItem.completed}
							id={todoItem.id}
							dueDate={todoItem.dueDate}
						/> // {...todo}
					))}
				</ul>
			</div>
		);
	}
}

export default TodoList;
