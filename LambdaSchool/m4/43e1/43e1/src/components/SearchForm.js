import React, { useState, useEffect } from 'react';
import JokeCard from '../components/JokeCard.js';

const SearchForm = props => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const results = props.jokes.filter(joke => joke.joke.toLowerCase().includes(searchTerm.toLowerCase()));
		setSearchResults(results);
	}, [searchTerm]);

	const handleChange = event => {
		setSearchTerm(event.target.value);
	};
	return (
		<section className="search-form">
			<form>
				<label htmlFor="name">Search:</label>
				<input
					id="name"
					type="text"
					name="textfield"
					placeholder="Search"
					value={searchTerm}
					onChange={handleChange}
				/>
			</form>
			<div className="character-list">
				<ul>
					{searchResults.map(joke => (
						<JokeCard key={joke.id} joke={joke} />
					))}
				</ul>
			</div>
		</section>
	);
};

export default SearchForm;
