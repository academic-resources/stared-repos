import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IndividualCar from './IndividualCar';
import { selectCar } from '../actions';
import { connect } from 'react-redux';
import { selectMustang, selectBatmobile, selectWeinermobile } from '../actions';

const CarSelection = props => {
	const [carID, setCarID] = useState('');

	const [cars, setCars] = useState([
		{
			id: 1,
			price: 26395,
			name: '2019 Ford Mustang',
			image: 'https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg',
			features: []
		},
		{
			id: 2,
			price: 500000,
			name: '2020 Weinermobile',
			image: 'https://cdn.foodbeast.com/content/uploads/2014/02/OscarMayer_Wienermobile.jpg',
			features: []
		},
		{
			id: 3,
			price: 400000,
			name: '2020 Batmobile',
			image: 'https://i.ytimg.com/vi/Qm5FYTW6SF0/maxresdefault.jpg',
			features: []
		}
	]);
	/*
	const selectCar = () => {
		console.log('car variable  = ' + car);
		console.log('car id variable  = ' + car.id);
		if (car.id === 1) {
			console.log('selectMustang action fired off');
			selectCar(car);
		}
		if (car.id === 2) {
			console.log('selectBatmobile action fired off');
			selectCar(car);
		}
		if (car.id === 3) {
			console.log('selectWeinermobile action fired off');
			selectCar(car);
		}
	};
	*/

	const selectCar = () => {
		console.log('car id variable  = ' + carID);
		if (carID === 1) {
			console.log('selectMustang action fired off');
			selectMustang(props.cars[0]);
		}
		if (carID === 2) {
			console.log('selectBatmobile action fired off');
			selectBatmobile(props.cars[1]);
		}
		if (carID === 3) {
			console.log('selectWeinermobile action fired off');
			selectWeinermobile(props.cars[2]);
		}
	};
	const selectCarCS = event => {
		setCarID(event.target.value);
		console.log('selectCarCS fired off');
		selectCar();
	};
	// Multiple cars on page
	// Select one
	// Set selected one as initial state
	// Load regular page with new initialState

	var styleCarsContainer = {
		display: 'flex',
		width: '100%',
		padding: 0,
		margin: '1%',
		flexWrap: 'nowrap'
	};
	var styleOneCar = {
		display: 'flex',
		width: '32%',
		flexDirection: 'column',
		flexWrap: 'wrap'
	};
	return (
		<div style={styleCarsContainer}>
			{cars.map(car => (
				<div key={car.id} style={styleOneCar}>
					<Link to={`/main`} car={car} id={car.id}>
						<IndividualCar key={car.id} car={car} id={car.id} value={car.id} onClick={selectCarCS(event)} />
					</Link>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = state => {
	console.log('state = ' + state.car);
	return {};
};

export default connect(mapStateToProps, { selectCar })(CarSelection);
