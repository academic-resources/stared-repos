import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
	//JSON.parse(item)

	const [storedValue, setStoredValue] = useState(cb);

	const cb = () => {
		// check to see if the item we passed in already exists in localStorage, & return that value
		// otherwise we'll return whatever initialValue was passed in.
		const item = window.localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	};

	const setValue = value => {
		setStoredValue(value);
		window.localStorage.setItem(key, JSON.stringify(value));
	};

	return [storedValue, setValue];
};

export default useLocalStorage;
