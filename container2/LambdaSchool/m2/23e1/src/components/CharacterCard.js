import React from "react";
import styled from 'styled-components'

const Div = styled.div`
  background: #002244;
  border-radius: 3px;
  border: 2px solid #69BE28;
  color: #A5ACAF;
  font-weight: bold;
  margin: 0 1em;
  padding: 0.25em 1em;
`
const Result = styled.div`
  background: #002244;
  border-radius: 3px;
  border-bottom: 2px solid #A5ACAF;
  color: #A5ACAF;
  font-weight: bold;
  margin: 0 1em;
  padding: 0.25em 1em;
`

const Wrapper = styled.div`
  background: #002244;
  border-radius: 3px;
  border: none;
  color: #A5ACAF;
  font-weight: bold;
  margin: 0 1em;
  padding: 0.25em 1em;
`

const CharacterCard = character => {
  console.log(character);
  return (
    <Wrapper className="save-wrapper">
      <Div className="movie-card">
        <h2>{character.character.name}</h2>
        <img src={character.character.img} width="10%"/>
        <Result className="movie-director">Species: <em>{character.character.species}</em></Result>
        <Result className="movie-metascore">Status: <strong>{character.character.status}</strong></Result>
        <Result>
          Current Location:  <em>{character.character.location.name}</em>
        </Result>
      </Div>
    </Wrapper>
    
  );
}
export default CharacterCard;