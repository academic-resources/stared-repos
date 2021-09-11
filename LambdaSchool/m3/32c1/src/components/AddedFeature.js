import React from 'react';
import { connect } from 'react-redux';
import { removeFeature } from '../actions';

const AddedFeature = props => {
	const removeFeature = () => {
		console.log('additionalfeature buyitem fired off');
		props.removeFeature(props.feature);
	};

	return (
		<li>
			<button className="button" onClick={removeFeature}>
				X
			</button>
			{props.feature.name}
		</li>
	);
};

const mapStateToProps = state => {
	return {};
};
export default connect(mapStateToProps, { removeFeature })(AddedFeature);
