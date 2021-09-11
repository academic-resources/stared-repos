import React from 'react';

/*
		• display the count of balls and strikes for the at-bat.
should be updated when the user records activity on the Dashboard component.
*/

class Display extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<h2>Balls: </h2>
				<div id="balls">{this.props.balls}</div>

				<h2>Strikes: </h2>
				<div id="strikes">{this.props.strikes}</div>

				<h2>Inning: </h2>
				<div id="inning">{this.props.inning}</div>

				<h2>Home: </h2>
				<div id="runsH">Runs: {this.props.runsH}</div>
				<div id="errorsH">Errors: {this.props.errorsH}</div>
				<div id="outs">Outs: {this.props.outsH}</div>
				<h2>Away: </h2>
				<div id="runsA">Runs: {this.props.runsA}</div>
				<div id="errorsA">Errors: {this.props.errorsA}</div>
				<div id="outs">Outs: {this.props.outsA}</div>
			</div>
		);
	}
}

export default Display;
