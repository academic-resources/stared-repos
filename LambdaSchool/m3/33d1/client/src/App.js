import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import UpdateList from './Movies/UpdateList';
import AddMovie from './Movies/AddMovie';

const App = () => {
	const [savedList, setSavedList] = useState([]);
	const [movies, setMovies] = useState([]);

	const addToSavedList = movie => {
		setSavedList([...savedList, movie]);
	};

	return (
		<>
			<SavedList list={savedList} />
			<Route exact path="/" component={MovieList} />
			<Route
				path="/movies/:id"
				render={props => {
					return <Movie {...props} addToSavedList={addToSavedList} />;
				}}
			/>
			<Route
				path="/update-movie/:id"
				render={props => <UpdateList {...props} movies={movies} setMovies={setMovies} />}
			/>
			<Route path="/add-movie" render={props => <AddMovie {...props} movies={movies} setMovies={setMovies} />} />
		</>
	);
};

export default App;
