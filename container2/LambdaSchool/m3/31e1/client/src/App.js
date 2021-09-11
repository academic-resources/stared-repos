import React from 'react';
import './App.css';
import axios from 'axios';
import PlayerCard from './components/PlayerCard.js';
import Navbar from './components/Navbar.js';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			soccerPlayers: [],
			searchTerm: ''
		};
	}

	componentDidMount() {
		console.log('componentDidMount running');
		let url = `http://localhost:5000/api/players`;
		axios({
			method: 'get',
			url: url
		})
			.then(response => {
				this.setState({ soccerPlayers: response.data });
				console.log(this.state.soccerPlayers);
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<div className="App" id="App">
				<Navbar />
				<div>
					{this.state.soccerPlayers.map(player => (
						<PlayerCard player={player} />
					))}
				</div>
			</div>
		);
	}
}

export default App;
