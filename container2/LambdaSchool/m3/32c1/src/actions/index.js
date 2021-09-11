export const BUY_ITEM = 'BUY_ITEM';
export const REMOVE_FEATURE = 'REMOVE_FEATURE';
export const MUSTANG = 'MUSTANG';
export const WEINERMOBILE = 'WEINERMOBILE';
export const BATMOBILE = 'BATMOBILE';
export const SELECT_CAR = 'SELECT_CAR';
let carSelection;

export const buyItem = feature => {
	console.log('buyItem action fired off');
	return {
		type: BUY_ITEM,
		payload: feature
	};
};

export const removeFeature = feature => {
	console.log('removeFeature action fired off');
	return {
		type: REMOVE_FEATURE,
		payload: feature
	};
};

export const selectCar = car => {
	console.log('car on actions index.js  = ' + car);
	carSelection = 'SELECT_CAR';
	if (car.id === 1) {
		console.log('selectMustang action fired off');
		carSelection = 'MUSTANG';
	}
	if (car.id === 2) {
		console.log('selectBM action fired off');
		carSelection = 'BATMOBILE';
	}
	if (car.id === 3) {
		console.log('selectWB action fired off');
		carSelection = 'WEINERMOBILE';
	}
	return {
		type: carSelection,
		payload: car
	};
};

export const selectBatmobile = car => {
	console.log('car on actions index.js  = ' + car);
	console.log('selectBM action fired off');
	return {
		type: BATMOBILE,
		payload: car
	};
};

export const selectWeinermobile = car => {
	console.log('car on actions index.js  = ' + car);
	console.log('selectWB action fired off');
	return {
		type: WEINERMOBILE,
		payload: car
	};
};

export const selectMustang = car => {
	console.log('car on actions index.js  = ' + { car });
	console.log('selectMustang action fired off');
	return {
		type: MUSTANG,
		payload: car
	};
};
