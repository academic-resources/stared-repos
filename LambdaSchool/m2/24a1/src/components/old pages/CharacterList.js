// import React, { useEffect, useState } from "react";
// import CharacterCard from '../components/CharacterCard.js';
// import axios from 'axios';
// import { Route } from 'react-router-dom';
// import SearchForm from './SearchForm.js';

export default function CharacterList() {
  const  [characters, setCharacters] = useState([])

  useEffect(() => {
    const getChars = () => {
      axios
        .get('https://rickandmortyapi.com/api/character/')
        .then(response => {
          setCharacters(response.data.results);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getChars();
  }, []);

  return (
    <section className="character-list">
      <SearchForm characters={characters}/>
      {
        characters.map(
          character => (
            <CharacterCard key={character.id} character={character} />
          )
        )
      }
    </section>
  );
};