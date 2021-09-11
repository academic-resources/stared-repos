import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import * as rtl from '@testing-library/react';
import 'jest-dom/extend-expect';

afterEach(rtl.cleanup);

it('renders without crashing', () => {
	// ready to test!
});
