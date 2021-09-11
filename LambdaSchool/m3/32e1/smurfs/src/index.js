import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import registerServiceWorker from './registerServiceWorker';

import { reducer } from './reducers';

const rootReducer = combineReducers({
	reducer: reducer,
	form: formReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

const rootElement = document.getElementById('root');
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);

registerServiceWorker();
