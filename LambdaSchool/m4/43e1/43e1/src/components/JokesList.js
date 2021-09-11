import React, { useEffect, useState } from 'react';
import JokeCard from '../components/JokeCard.js';
import axios from 'axios';
import SearchForm from './SearchForm.js';

export default function CharacterList() {
	const [jokes, setJokes] = useState([]);

	useEffect(() => {
		const getJokes = () => {
			const requestOptions = {
				headers: { accept: 'application/json' }
			};
			axios
				.get('https://icanhazdadjoke.com/search', requestOptions)
				.then(response => {
					setJokes(response.data.results);
					console.log(response.data.results);
				})
				.catch(error => {
					console.error('Server Error', error);
				});
		};
		getJokes();
	}, []);

	return (
		<section className="character-list">
			<SearchForm jokes={jokes} />
		</section>
	);
}
