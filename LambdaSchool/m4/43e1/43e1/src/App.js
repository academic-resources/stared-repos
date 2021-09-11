import React from 'react';
import Header from './components/Header.js';
import { Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage.js';
import JokesList from './components/JokesList.js';

export default function App() {
	return (
		<main>
			<Header />
			<Route path="/" component={JokesList} />
		</main>
	);
}
