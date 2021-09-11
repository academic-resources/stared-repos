import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
  return (
      <div className="movie-card">
            <h2>{props.movie.title}</h2>
            <div className="movie-director">Director: <em>{props.movie.director}</em></div>
            <div className="movie-metascore">Metascore: <strong>{props.movie.metascore}</strong></div>
        <h3>Actors</h3>
        <ul>
            {
            [props.movie.stars].map(star => (
              <li key={star} className="movie-star">{star} </li>
            ))
            }
        </ul>
          </div>
  )
};


export default MovieCard;
