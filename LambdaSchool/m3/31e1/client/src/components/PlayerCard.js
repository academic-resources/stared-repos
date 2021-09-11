import React from 'react';

class PlayerCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		// avatar_url name username location followers following bio
		// calendar
		let divID = `PlayerCard${this.props.player.id}`;
		return (
			<div id={divID}>
				<h2>Name: {this.props.player.name}</h2>
				<h3>Country: {this.props.player.country}</h3>
				<h3>Number of Searches: {this.props.player.searches}</h3>
				<h4>-------------------------------</h4>
			</div>
		);
	}
}

export default PlayerCard;
