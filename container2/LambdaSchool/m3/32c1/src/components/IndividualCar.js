import React from 'react';

var styleOneCar = {
	display: 'flex',
	width: '100%',
	flexDirection: 'column',
	flexWrap: 'wrap',
	padding: '1%'
};

const IndividualCar = props => {
	return (
		<div style={styleOneCar}>
			<img src={props.car.image} alt={props.car.name} />
			<h2>{props.car.name}</h2>
		</div>
	);
};

export default IndividualCar;
