import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {movies : ['King Kong' , 'Harry Potter' , 'Godfather']};
  render() {
    const elements = this.state.movies.map((movie,index) =>
     <p onClick={() => {
      let tmpMovies = [...this.state.movies];
      tmpMovies.splice(index,1);
      this.setState({movies : tmpMovies});
     }}>{index + 1} : {movie}</p>)
    return (
      <div className="App">
        <h2>Favorite movies</h2>
        {elements}
      </div>
    );
  }
}

export default App;
