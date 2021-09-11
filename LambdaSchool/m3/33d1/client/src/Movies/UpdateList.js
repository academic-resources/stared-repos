import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
	title: '',
	director: '',
	metascore: '',
	stars: []
};

const UpdateForm = props => {
	const [movie, setMovie] = useState(initialMovie);
	const { id } = useParams();

	useEffect(() => {
		const itemToUpdate = props.movies.find(movie => `${movie.id}` === props.match.params.id);

		if (itemToUpdate) {
			setMovie(itemToUpdate);
		}
	}, [props.movies, props.match.params.id]);

	const changeHandler = event => {
		event.persist();

		setMovie({
			...movie,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log({ ...movie, id: id });
		axios
			.put(`http://localhost:5000/api/movies/${id}`, { ...movie, id: id })
			.then(res => {
				console.log(res.data);
				props.setMovies(res.data);
				props.history.push(`/api/movies/${id}`);
				// props.history.goBack();
			})
			.catch(err => console.log(err));
	};

	return (
		<div>
			<h2>Update Movie</h2>

			<form onSubmit={handleSubmit}>
				<input type="text" name="title" onChange={changeHandler} placeholder="title" value={movie.title} />
				<div className="baseline" />

				<input
					type="text"
					name="director"
					onChange={changeHandler}
					placeholder="director"
					value={movie.director}
				/>
				<div className="baseline" />

				<input
					type="number"
					name="metascore"
					onChange={changeHandler}
					placeholder="metascore"
					value={movie.metascore}
				/>
				<div className="baseline" />

				<input type="text" name="stars" onChange={changeHandler} placeholder="stars" value={movie.stars} />
				<div className="baseline" />

				<button type="submit" className="md-button form-button">
					Update
				</button>
			</form>
		</div>
	);
};

export default UpdateForm;
