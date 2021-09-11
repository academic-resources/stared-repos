import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { useParams } from 'react-router-dom';
import addToSavedList from '../App';

const Movie = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // const id = props.match.params.id;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook
       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });
  }, []);
  
  // Uncomment this only when you have moved on to the stretch goals
  /*
  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie)
  }
*/
  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  else {
    return (      
      <div className="save-wrapper">
        <MovieCard movie={movie} />
        <div className="save-button" onClick={addToSavedList}>Save</div>
      </div>
    );
    }
/*
  const { title, director, metascore, stars } = movie;
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button">Save</div>
    </div>
  */
}

export default Movie;