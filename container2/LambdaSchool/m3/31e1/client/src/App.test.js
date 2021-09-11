import React from 'react';

import { render } from '@testing-library/react';
import App from './App';
import PlayerCard from './components/PlayerCard.js';

test('renders NavBar without crashing', () => {
	const { getByText } = document.getElementById('NavBar');
	const linkElement2 = getByText(/Soccer Players Ranked by Number of Google Searches/i);
	expect(linkElement2).toBeInTheDocument();
});

test('renders Data without crashing', () => {
	const { getByText } = document.getElementById('PlayerCard100');
	const linkElement2 = getByText(/Tierna Davidson/i);
	expect(linkElement2).toBeInTheDocument();
});
