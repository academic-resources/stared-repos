import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Display from './components/Display';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			balls: 0,
			strikes: 0,
			outsH: 0,
			outsA: 0,
			runsH: 0,
			errorsH: 0,
			runsA: 0,
			errorsA: 0,
			inning: 1,
			outsTotal: 0,
			side: true
		};
	}

	maxBallsStrikes = () => {
		// balls and strikes reset to 0 when a player reaches 3 strikes or 4 balls.
		if (this.state.balls === 4 || this.state.strikes === 3) {
			this.setState({ balls: 0 });
			this.setState({ strikes: 0 });
			if (this.state.side === true) {
				this.setState({ outsH: this.state.outsH + 1 });
				this.setState({ outsTotal: this.state.outsTotal + 1 });
			} else {
				this.setState({ outsA: this.state.outsA + 1 });
				this.setState({ outsTotal: this.state.outsTotal + 1 });
			}
		}
		if (this.state.outsH === 3 || this.state.outsA === 3) {
			this.setState({ balls: 0 });
			this.setState({ strikes: 0 });
			this.setState({ outsH: 0 });
			this.setState({ outsA: 0 });
			this.setState(prevState => ({
				side: !prevState.side
			}));
		}
		if (this.state.outsTotal === 6) {
			this.setState({ inning: this.state.inning + 1 });
			this.setState({ outsTotal: 0 });
		}
	};

	recordBall = () => {
		if (this.state.balls < 4) {
			this.setState({ balls: this.state.balls + 1 });
		} else {
			this.maxBallsStrikes();
		}
	};
	recordOut = () => {
		if (this.state.outsH < 3 && this.state.outsA < 3) {
			if (this.state.side === true) {
				this.setState({ outsH: this.state.outsH + 1 });
				this.setState({ outsTotal: this.state.outsTotal + 1 });
			} else {
				this.setState({ outsA: this.state.outsA + 1 });
				this.setState({ outsTotal: this.state.outsTotal + 1 });
			}
		} else {
			this.maxBallsStrikes();
		}
	};

	recordStrike = () => {
		if (this.state.strikes < 3) {
			this.setState({ strikes: this.state.strikes + 1 });
		} else {
			this.maxBallsStrikes();
		}
	};
	recordFoul = () => {
		// With no strikes, a foul makes it 1 strike.
		// With 1 strike, a foul makes it 2 strikes.
		// With two strikes a foul has no effect, count stays at 2 strikes.
		if (this.state.strikes === 0 || this.state.strikes === 1) {
			this.setState({ strikes: this.state.strikes + 1 });
		}
		this.maxBallsStrikes();
	};

	recordHit = () => {
		// hit = reset balls and strikes to 0
		this.setState({ balls: 0 });
		this.setState({ strikes: 0 });
	};

	recordRun = () => {
		if (this.state.side === true) {
			this.setState({ runsH: this.state.runsH + 1 });
		} else {
			this.setState({ runsA: this.state.runsA + 1 });
		}
	};
	recordError = () => {
		if (this.state.side === true) {
			this.setState({ errorsH: this.state.errorsH + 1 });
		} else {
			this.setState({ errorsA: this.state.errorsA + 1 });
		}
	};
	componentDidUpdate() {
		this.maxBallsStrikes();
	}

	inningSwitch() {}
	render() {
		return (
			<div>
				<Display
					balls={this.state.balls}
					strikes={this.state.strikes}
					outsH={this.state.outsH}
					outsA={this.state.outsA}
					runsH={this.state.runsH}
					runsA={this.state.runsA}
					inning={this.state.inning}
					errorsH={this.state.errorsH}
					errorsA={this.state.errorsA}
				/>
				<Dashboard
					recordStrike={this.recordStrike}
					recordBall={this.recordBall}
					recordFoul={this.recordFoul}
					recordHit={this.recordHit}
					recordRun={this.recordRun}
					recordError={this.recordError}
					recordOut={this.recordOut}
				/>
			</div>
		);
	}
}
export default App;
