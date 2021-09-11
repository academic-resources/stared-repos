import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBndpDc-q641AG3WVK-zxo5q-OhO_5zi6I",
    authDomain: "evernote-clone-ab911.firebaseapp.com",
    databaseURL: "https://evernote-clone-ab911.firebaseio.com",
    projectId: "evernote-clone-ab911",
    storageBucket: "evernote-clone-ab911.appspot.com",
    messagingSenderId: "782401735614",
    appId: "1:782401735614:web:23d4e818528c5e0d1287ef"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('evernote-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
