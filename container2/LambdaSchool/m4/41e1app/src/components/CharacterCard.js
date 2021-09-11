import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
	background: #002244;
	border-radius: 3px;
	border: 2px solid #69be28;
	color: #a5acaf;
	font-weight: bold;
	margin: 0 1em;
	padding: 0.25em 1em;
`;
const Result = styled.div`
	background: #002244;
	border-radius: 3px;
	border-bottom: 2px solid #a5acaf;
	color: #a5acaf;
	font-weight: bold;
	margin: 0 1em;
	padding: 0.25em 1em;
`;

const Wrapper = styled.div`
	background: #002244;
	border-radius: 3px;
	border: none;
	color: #a5acaf;
	font-weight: bold;
	margin: 0 1em;
	padding: 0.25em 1em;
`;

const CharacterCard = character => {
	console.log(character);
	return (
		<Wrapper className="save-wrapper">
			<Div className="movie-card">
				<h2>{character.character.name}</h2>
				<Result className="movie-metascore">
					Description: <strong>{character.character.description}</strong>
				</Result>
				<Result>
					Completed: <em>{character.character.completed}</em>
				</Result>
			</Div>
		</Wrapper>
	);
};
export default CharacterCard;
