import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage.js';

const useDarkMode = (key, initialValue) => {
	const [darkModeOn, setDarkModeOn] = useLocalStorage('darkModeOn');

	useEffect(() => {
		let bodyElement = document.body;

		if (darkModeOn === true) {
			bodyElement.classList.add('dark-mode');
		} else {
			bodyElement.classList.remove('dark-mode');
		}
	}, [darkModeOn]);

	return [darkModeOn, setDarkModeOn];
};

export default useDarkMode;
