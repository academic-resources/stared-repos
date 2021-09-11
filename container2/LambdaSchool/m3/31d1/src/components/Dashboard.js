import React from 'react';

/*
		• provide a button that the person in charge can press every time there is a strike, ball, foul or hit.
		• there is NO need to specify the type of hit (single, double, etc).
changes recorded on this component should update the information shown by the Display component.
*/

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<button onClick={this.props.recordStrike}>Strike</button>
				<button onClick={this.props.recordBall}>Ball</button>
				<button onClick={this.props.recordFoul}>Foul</button>
				<button onClick={this.props.recordHit}>Hit</button>
				<button onClick={this.props.recordRun}>Run</button>
				<button onClick={this.props.recordError}>Error</button>
				<button onClick={this.props.recordOut}>Out</button>
			</div>
		);
	}
}
export default Dashboard;
