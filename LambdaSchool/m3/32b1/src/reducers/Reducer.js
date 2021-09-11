// import React, { useState, useReducer } from 'react';

export const task = {
	tasks: [{ item: 'Learn about reducers', completed: false, id: 3892987589, dueDate: '01-21-2020' }]
};

export const Reducer = (state, action) => {
	switch (action.type) {
		case 'TASK_CLEAR_COMPLETED':
			return {
				tasks: state.tasks.filter(todoItem => !todoItem.completed)
			};
		case 'TASK_ADD':
			const addTask = {
				item: action.payload,
				completed: false,
				id: Date.now(),
				dueDate: '01-21-2020'
			};
			console.log('TASK_ADD fired off @ case switch');
			console.log(state.tasks);
			return {
				...state,
				tasks: [...state.tasks, addTask]
			};
		case 'TASK_TOGGLE_COMPLETED':
			console.log('TASK_TOGGLE_COMPLETED fired off @ case switch');
			return {
				...state,
				tasks: state.tasks.map(task => {
					console.log(task.id, task.item, task.completed);
					console.log('action.payload = ' + action.payload);
					if (task.id === action.payload) {
						return { ...task, completed: !task.completed };
					} else {
						return task;
					}
				})
			};

		default:
			return state;
	}
};
