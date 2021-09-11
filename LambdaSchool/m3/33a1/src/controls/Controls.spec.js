// Test away!
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import Controls from './Controls';

jest.mock('../api');

test('gate defaults to `unlocked` and `open`', async () => {
	const { getByLabelText } = render(<Controls />);
	const gateOpen = getByLabelText(/open/i);
	const gateUnlocked = getByLabelText(/unlocked/i);
	expect(gateUnlocked);
	expect(gateOpen);
});

test('cannot be closed or opened if it is locked', () => {
	const { getByLabelText } = render(<Controls />);
	const gateLocked = getByLabelText(/locked/i);
	const gateOpen = getByLabelText(/open/i);
	const gateClosed = getByLabelText(/closed/i);
	expect(gateLocked).not.expect(gateClosed);
	expect(gateLocked).not.expect(gateOpen);
});

test('shows the controls and display', () => {
	const getControls = render(<Controls />);
	const getDisplay = render(<Display />);
	expect(getControls).expect(getDisplay);
});

test('displays if gate is open/closed and if it is locked/unlocked', () => {
	const { getByLabelText } = render(<Controls />);
	const gateLocked = getByLabelText(/locked/i);
	const gateUnlocked = getByLabelText(/unlocked/i);
	const gateOpen = getByLabelText(/open/i);
	const gateClosed = getByLabelText(/closed/i);
	expect(gateUnlocked);
	expect(gateLocked);
	expect(gateClosed);
	expect(gateOpen);
});
test('displays `Closed` if the `closed` prop is `true` and `Open` if otherwise', () => {
	const { getByLabelText } = render(<Controls />);
	const gateClosed = getByLabelText(/closed/i);
	const gateOpen = getByLabelText(/open/i);
	expect(gateClosed)
		.expect
		// closed prop === true
		();
	expect(gateOpen)
		.expect
		// closed prop === false
		();
});
test('displays `Locked` if the `locked` prop is `true` and `Unlocked` if otherwise', () => {
	const { getByLabelText } = render(<Controls />);
	const gateLocked = getByLabelText(/locked/i);
	const gateUnlocked = getByLabelText(/unlocked/i);
	expect(gateLocked)
		.expect
		// locked prop === true
		();
	expect(gateUnlocked)
		.expect
		// locked prop === false
		();
});
test('when `locked` or `closed` use the `red-led` class', () => {
	const { getByLabelText } = render(<Controls />);
	const gateClosed = getByLabelText(/closed/i);
	const gateLocked = getByLabelText(/locked/i);
	expect(gateClosed).expect(
		// use the `red-led` class'
		document.getElementsByClassName('red-led')
	);
	expect(gateLocked).expect(
		// `use the `red-led` class'
		document.getElementsByClassName('red-led')
	);
});
test('when `unlocked` or `open` use the `green-led` class', () => {
	const { getByLabelText } = render(<Controls />);
	const gateUnlocked = getByLabelText(/unlocked/i);
	const gateOpen = getByLabelText(/open/i);
	expect(gateUnlocked).expect(
		// use the `green-led` class
		document.getElementsByClassName('green-led')
	);
	expect(gateOpen).expect(
		// use the `green-led` class
		document.getElementsByClassName('green-led')
	);
});
test('provide buttons to toggle the `closed` and `locked` states.', () => {
	const { getByLabelText } = render(<Controls />);
	const gateClosed = getByLabelText(/closed/i);
	const gateLocked = getByLabelText(/locked/i);
	expect(gateClosed)
		.expect
		// provide buttons to toggle the `closed` and `locked` states.
		();
	expect(gateLocked)
		.expect
		// provide buttons to toggle the `closed` and `locked` states.
		();
});
test('buttons text changes to reflect the state the door will be in if clicked', () => {
	const { getByLabelText } = render(<Controls />);
	expect()
		.expect
		// buttons text changes to reflect the state the door will be in if clicked
		();
});
test('the closed toggle button is disabled if the gate is locked', () => {
	const { getByLabelText } = render(<Controls />);
	const gateLocked = getByLabelText(/locked/i);
	expect(gateLocked)
		.expect
		// closed toggle button is disabled
		();
});
test('the locked toggle button is disabled if the gate is open', () => {
	const { getByLabelText } = render(<Controls />);
	const gateOpen = getByLabelText(/open/i);
	expect(gateOpen)
		.expect
		// locked toggle button is disabled
		();
});

/*
## Stretch Problem

This section is **optional** and not counted towards MVP. Start working on it after you're done with the main assignment.

- add `Redux` and [read this example in the docs](https://testing-library.com/docs/example-react-redux) to learn how to write tests for it.
*/
