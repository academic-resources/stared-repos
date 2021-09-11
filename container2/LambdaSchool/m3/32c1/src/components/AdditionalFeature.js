import React from 'react';
import { connect } from 'react-redux';
import { buyItem } from '../actions';

const AdditionalFeature = props => {
	const buyItem = () => {
		console.log('additionalfeature buyitem fired off');
		props.buyItem(props.feature);
	};

	return (
		<li>
			<button className="button" onClick={buyItem}>
				Add
			</button>
			{props.feature.name} (+{props.feature.price})
		</li>
	);
};
const mapStateToProps = state => {
	return {};
};
export default connect(mapStateToProps, { buyItem })(AdditionalFeature);
