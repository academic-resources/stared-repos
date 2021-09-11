import React, { useState } from 'react';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const [savedList, setSavedList] = useState( [] );

  const addToSavedList = movie => {
    setSavedList( [...savedList, movie] );
  };

  return (
    <div>
      <Router>
        <SavedList list={savedList} />
        <Route exact path="/">
          <MovieList />
        </Route>
        <Route path="/movies/:id" >
          <Movie />
        </Route>
      </Router>
    </div>
  );
};

export default App;
