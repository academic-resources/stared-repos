import axios from 'axios';

export const FETCHING_ACTIVITY_START = 'FETCHING_ACTIVITY_START';
export const FETCHING_ACTIVITY_SUCCESS = 'FETCHING_ACTIVITY_SUCCESS';
export const FETCHING_ACTIVITY_FAILURE = 'FETCHING_ACTIVITY_FAILURE';
export const DATE_SELECTED = 'DATE_SELECTED';

export const fetchActivity = () => dispatch => {
	dispatch({ type: FETCHING_ACTIVITY_START });
	dispatch({ type: DATE_SELECTED, payload: dispatch.date });

	var randomDate;
	var minYear = 2000;
	var maxYear = 2019;
	var randomYear = minYear + Math.round(Math.random() * (maxYear - minYear));
	var minMonth = 1;
	var maxMonth = 12;
	var randomMonth = minMonth + Math.round(Math.random() * (maxMonth - minMonth));
	var minDay = 1;
	var maxDay = 28;
	var randomDay = minDay + Math.round(Math.random() * (maxDay - minDay));
	randomDate = randomYear + '-' + randomMonth + '-' + randomDay;
	axios
		.get('https://api.nasa.gov/planetary/apod?date=' + randomDate + '&api_key=' + process.env.REACT_APP_API_KEY)
		.then(response => {
			console.log('done contacting NASA apod');
			console.log(response.data);
			dispatch({ type: FETCHING_ACTIVITY_SUCCESS, payload: response.data });
		})
		.catch(error => {
			console.log('done contacting NASA apod');
			console.log(error.response);
			dispatch({ type: FETCHING_ACTIVITY_FAILURE, payload: error.response });
			console.log(error);
		});
};

// const thunk = action => next => store => {
//   if (typeof action === 'function') {
//     action(store.dispatch);
//   } else if (typeof action === 'object') {
//     next(action);
//   }
// };

/*
    var minYear = 2000;
    var maxYear = 2020;
    var randomYear = minYear + Math.round(Math.random() * (maxYear - minYear));
    var minMonth = 1;
    var maxMonth = 12;
    var randomMonth = minMonth + Math.round(Math.random() * (maxMonth - minMonth));
    var minDay = 1;
    var maxDay = 28;
    var randomDay = minDay + Math.round(Math.random() * (maxDay - minDay));
    var randomDate = randomYear + '-' + randomMonth + '-' + randomDay;
    axios
        .get('https://api.nasa.gov/planetary/apod?date=' + randomDate + '&api_key=' + process.env.REACT_APP_API_KEY)
        .then(response => {
            this.setState({ imgURL: response.data.hdurl });
            this.setState({ copyright: response.data.copyright });
            this.setState({ date: response.data.date });
            this.setState({ explanation: response.data.explanation });
            console.log('done contacting NASA apod');
        })
        .catch(error => {
            console.log(error);
        });
*/
