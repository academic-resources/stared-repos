import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

import './index.css';
// import 'react-alice-carousel/lib/alice-carousel.css';

//Redux Store
import configureStore from './store';

//Set initial state
const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
