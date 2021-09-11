import { REMOVE_FEATURE, BUY_ITEM, WEINERMOBILE, BATMOBILE, MUSTANG, SELECT_CAR } from '../actions';

export const initialState = {
	additionalPrice: 0,
	car: {
		price: 26395,
		name: '2019 Ford Mustang',
		image: 'https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg',
		features: []
	},
	additionalFeatures: [
		{ id: 1, name: 'V-6 engine', price: 1500 },
		{ id: 2, name: 'Racing detail package', price: 1500 },
		{ id: 3, name: 'Premium sound system', price: 500 },
		{ id: 4, name: 'Rear spoiler', price: 250 }
	]
};

export const reducer = (state = initialState, action) => {
	console.log('initialState = ' + state);
	console.log('action type = ' + action.type);
	console.log('payload = ' + state.car);
	switch (action.type) {
		case SELECT_CAR:
			if (state.car.id === 1) {
				console.log('MUSTANG fired off');
				return {
					additionalPrice: 0,
					car: {
						id: 1,
						price: 26395,
						name: '2019 Ford Mustang',
						image: 'https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg',
						features: []
					},
					additionalFeatures: [
						{ id: 1, name: 'V-6 engine', price: 1500 },
						{ id: 2, name: 'Racing detail package', price: 1500 },
						{ id: 3, name: 'Premium sound system', price: 500 },
						{ id: 4, name: 'Rear spoiler', price: 250 }
					]
				};
			}
			if (state.car.id === 2) {
				console.log('BATMOBILE fired off');
				return {
					additionalPrice: 0,
					car: {
						id: 3,
						price: 400000,
						name: '2020 Batmobile',
						image: 'https://i.ytimg.com/vi/Qm5FYTW6SF0/maxresdefault.jpg',
						features: []
					},
					additionalFeatures: [
						{ id: 1, name: 'V-6 engine', price: 1500 },
						{ id: 2, name: 'Racing detail package', price: 1500 },
						{ id: 3, name: 'Premium sound system', price: 500 },
						{ id: 4, name: 'Rear spoiler', price: 250 }
					]
				};
			}
			if (state.car.id === 3) {
				console.log('WEINERMOBILE fired off');
				return {
					additionalPrice: 0,
					car: {
						id: 2,
						price: 500000,
						name: '2020 Weinermobile',
						image: 'https://cdn.foodbeast.com/content/uploads/2014/02/OscarMayer_Wienermobile.jpg',
						features: []
					},
					additionalFeatures: [
						{ id: 1, name: 'V-6 engine', price: 1500 },
						{ id: 2, name: 'Racing detail package', price: 1500 },
						{ id: 3, name: 'Premium sound system', price: 500 },
						{ id: 4, name: 'Rear spoiler', price: 250 }
					]
				};
			}

		case WEINERMOBILE:
			console.log('WEINERMOBILE fired off');
			return {
				additionalPrice: 0,
				car: {
					id: 2,
					price: 500000,
					name: '2020 Weinermobile',
					image: 'https://cdn.foodbeast.com/content/uploads/2014/02/OscarMayer_Wienermobile.jpg',
					features: []
				},
				additionalFeatures: [
					{ id: 1, name: 'V-6 engine', price: 1500 },
					{ id: 2, name: 'Racing detail package', price: 1500 },
					{ id: 3, name: 'Premium sound system', price: 500 },
					{ id: 4, name: 'Rear spoiler', price: 250 }
				]
			};

		case BATMOBILE:
			console.log('BATMOBILE fired off');
			return {
				additionalPrice: 0,
				car: {
					id: 3,
					price: 400000,
					name: '2020 Batmobile',
					image: 'https://i.ytimg.com/vi/Qm5FYTW6SF0/maxresdefault.jpg',
					features: []
				},
				additionalFeatures: [
					{ id: 1, name: 'V-6 engine', price: 1500 },
					{ id: 2, name: 'Racing detail package', price: 1500 },
					{ id: 3, name: 'Premium sound system', price: 500 },
					{ id: 4, name: 'Rear spoiler', price: 250 }
				]
			};
		case MUSTANG:
			console.log('MUSTANG fired off');
			return {
				additionalPrice: 0,
				car: {
					id: 1,
					price: 26395,
					name: '2019 Ford Mustang',
					image: 'https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg',
					features: []
				},
				additionalFeatures: [
					{ id: 1, name: 'V-6 engine', price: 1500 },
					{ id: 2, name: 'Racing detail package', price: 1500 },
					{ id: 3, name: 'Premium sound system', price: 500 },
					{ id: 4, name: 'Rear spoiler', price: 250 }
				]
			};
		case BUY_ITEM:
			console.log('BUY_ITEM fired off');
			if (state.car.features.includes(action.payload)) {
				return state;
			}
			return {
				...state,
				car: {
					...state.car,
					price: state.car.price + action.payload.price,
					features: [...state.car.features, action.payload]
				},
				additionalPrice: state.additionalPrice + action.payload.price
			};

		case REMOVE_FEATURE:
			console.log('REMOVE_FEATURE fired off');
			return {
				...state,
				car: {
					...state.car,
					price: state.car.price - action.payload.price,
					features: state.car.features.filter(car => car.id !== action.payload.id)
				},
				additionalPrice: state.additionalPrice - action.payload.price
			};

		default:
			return state;
	}
};
