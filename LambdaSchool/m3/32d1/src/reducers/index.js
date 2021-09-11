import {
	FETCHING_ACTIVITY_START,
	FETCHING_ACTIVITY_SUCCESS,
	FETCHING_ACTIVITY_FAILURE,
	DATE_SELECTED
} from '../actions';

const initialState = {
	isLoading: false,
	activity: null,
	error: '',
	hdurl: '',
	title: '',
	date: '',
	explanation: ''
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
				hdurl: action.payload.hdurl,
				title: action.payload.title,
				date: action.payload.date,
				explanation: action.payload.explanation
			};
		case DATE_SELECTED:
			return {
				...state
				// date: action.payload.date
			};

		default:
			return state;
	}
};
