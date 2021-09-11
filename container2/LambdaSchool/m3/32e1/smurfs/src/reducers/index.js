import {
	FETCHING_ACTIVITY_START,
	FETCHING_ACTIVITY_SUCCESS,
	FETCHING_ACTIVITY_FAILURE,
	FORM_SUBMIT,
	FORM_START,
	ADD_SMURF
} from '../actions';

const initialState = {
	isLoading: false,
	activity: null,
	error: '',
	name: '',
	age: '',
	height: '',
	newSmurf: null
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_ACTIVITY_START:
			return {
				...state,
				isLoading: true
			};
		case FETCHING_ACTIVITY_SUCCESS:
			return {
				...state,
				isLoading: false,
				activity: action.payload,
				name: action.payload.name,
				age: action.payload.age,
				height: action.payload.height
			};
		case FORM_SUBMIT:
			console.log('formReducer fired off == ' + action.payload);
			return {
				...state,
				name: action.payload.name,
				age: action.payload.age,
				height: action.payload.height
			};
		default:
			return state;
	}
};

export const formReducer = (state = initialState, action) => {
	switch (action.type) {
		case FORM_SUBMIT:
			console.log('formReducer fired off == ' + action.payload);
			return {
				...state,
				name: action.payload.name,
				age: action.payload.age,
				height: action.payload.height
			};
		case ADD_SMURF:
			return { ...state, name: action.payload.name, age: action.payload.age, height: action.payload.height };
		default:
			return state;
	}
};
