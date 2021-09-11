import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard.js';

const SearchForm = props => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const results = props.characters.filter(
			character =>
				character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				character.description.toLowerCase().includes(searchTerm.toLowerCase())
		);
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
					{searchResults.map(character => (
						<CharacterCard key={character.id} character={character} />
					))}
				</ul>
			</div>
		</section>
	);
};

export default SearchForm;
