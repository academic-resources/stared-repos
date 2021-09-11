import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CarSelection from './components/CarSelection';
import MainPage from './components/MainPage';

class App extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<Router>
				<Route path="/" component={CarSelection} />
				<Route path="/main" component={MainPage} />
			</Router>
		);
	}
}
export default App;
