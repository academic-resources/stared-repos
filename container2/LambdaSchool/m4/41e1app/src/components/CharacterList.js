import React, { useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard.js';
import axios from 'axios';
import { Route } from 'react-router-dom';
import SearchForm from './SearchForm.js';

export default function CharacterList() {
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		const getChars = () => {
			axios
				.get('http://localhost:5000/projects')
				.then(response => {
					console.log(response.data);
					setCharacters(response.data);
				})
				.catch(error => {
					console.error('Server Error', error);
				});
		};

		getChars();
	}, []);

	/*
{characters.map(character => (
				<CharacterCard key={character.id} character={character} />
			))}

  */
	return (
		<section className="character-list">
			<SearchForm characters={characters} />
		</section>
	);
}
