import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('balls count', () => {
	const { getByText } = render(<App />);
	const linkElement1 = getByText(/Balls/i);
	expect(linkElement1).toBeInTheDocument();
	const ballsElement = parseInt(`${balls}`);
	expect(ballsElement).not.toBeGreaterThan(4);
});

test('strikes count', () => {
	const { getByText } = render(<App />);
	const linkElement2 = getByText(/Strikes/i);
	expect(linkElement2).toBeInTheDocument();
	const strikesElement = parseInt(`${strikes}`);
	expect(strikesElement).not.toBeGreaterThan(3);
});
