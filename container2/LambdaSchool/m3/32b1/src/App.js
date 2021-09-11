import React, { useState, useReducer } from 'react';
import './App.css';
import { task, Reducer } from './reducers/Reducer';
import TodoForm from './components/TodoForm.js';
// import SearchForm from './components/SearchForm.js';
import TodoList from './components/TodoList.js';
import styled from 'styled-components';

const Div = styled.div`
	background-color: #002244;
	color: #a5acaf;
`;
function App() {
	const [state, dispatch] = useReducer(Reducer, task);

	const [newTask, addNewTask] = useState('');

	const todoChange = event => {
		event.preventDefault();
		// update state while typing task title
		addNewTask(event.target.value);
	};

	const toggleComplete = id => {
		console.log('dispatch TASK_TOGGLE_COMPLETED fired off from App.js');
		console.log('id = ' + id);
		dispatch({
			type: 'TASK_TOGGLE_COMPLETED',
			payload: id
		});
	};

	const todoSubmit = event => {
		event.preventDefault();
		dispatch({ type: 'TASK_ADD', payload: newTask });
		addNewTask('');
	};

	const todoClear = () => {
		dispatch({ type: 'TASK_CLEAR_COMPLETED' });
	};

	return (
		<Div>
			<h2>Todo List: MVP</h2>
			<h2>Type to Search or Click to Complete a Todo:</h2>
			{
				// <SearchForm dispatch={dispatch} tasks={state.tasks} />
			}
			<TodoForm
				dispatch={dispatch}
				tasks={state.tasks}
				value={state.newTask}
				newTask={state.newTask}
				todoChange={todoChange}
				todoClear={todoClear}
				todoSubmit={todoSubmit}
				toggleComplete={toggleComplete}
			/>
			<TodoList
				dispatch={dispatch}
				tasks={state.tasks}
				value={state.newTask}
				newTask={state.newTask}
				todoChange={todoChange}
				todoClear={todoClear}
				todoSubmit={todoSubmit}
				toggleComplete={toggleComplete}
			/>
		</Div>
	);
}

export default App;
