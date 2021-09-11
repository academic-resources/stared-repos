import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import App from './components/App';
import reducers from './reducers';
import './index.css';

const store = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
    <Provider store={store(reducers)}>
        <App />
    </Provider>,
    document.getElementById('root')
);