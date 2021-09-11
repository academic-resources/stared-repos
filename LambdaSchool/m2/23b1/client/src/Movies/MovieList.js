import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';


const MovieList = props => {
  const [movies, setMovies] = useState([{}])

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovies(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getMovies();
  }, []);

  return (
    <div className="movie-list" >
      {movies.map(movie => (
        <div key={movie.id}>
        <Link to={{ pathname: `/movies/${movie.id}` }}>
            <MovieCard key={movie.id} movie={movie} />
        </Link>
        </div>
      ))}
      {movies.map(movie => console.log(movie)
      )}
    </div>
  );
}


export default MovieList;
