import React from 'react';
import './App.css';
import Loader from './Loader';
import ContactForm from './ContactForm';

import { connect } from 'react-redux';
import { fetchActivity, addSmurf } from '../actions';
import DisplayAPI from './DisplayAPI';

const container = {
	width: '100%',
	marginTop: '0%',
	paddingTop: '0%'
};
const MainPage = props => {
	const submit = values => {
		var data = {
			isLoading: false,
			activity: { name: values.name, age: values.age, height: values.height },
			error: '',
			name: values.name,
			age: values.age,
			height: values.height
		};
		this.props.addSmurf(data);
	};

	return (
		<div className="App">
			<div style={container}>
				<h2>Smurf Village</h2>
				{!props.activity && !props.isLoading && <Loader />}
				{props.isLoading && <Loader />}
				<button onClick={props.fetchActivity}>Load Smurf Village</button>
				{props.activity && !props.isLoading && <ContactForm onSubmit={submit} />}
				{props.activity &&
					!props.isLoading &&
					props.activity.map(smurf => (
						<DisplayAPI
							key={smurf.id}
							name={smurf.name}
							age={smurf.age}
							height={smurf.height}
							id={smurf.id}
						/>
					))}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		activity: state.activity,
		error: state.error,
		name: state.name,
		age: state.age,
		height: state.height
	};
};
export default connect(mapStateToProps, { fetchActivity, addSmurf })(MainPage);
/*
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ addFriendAction }, dispatch);
}

export default connect(null, mapDispatchToProps)(MyComponent);
*/
