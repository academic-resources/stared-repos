exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('cars')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('cars').insert([
				{
					id: 1,
					VIN: '1245KL',
					make: 'Subaru',
					model: 'Outback',
					transmissionType: 'automatic',
					titleStatus: 'clean',
					mileage: 25
				},
				{
					id: 2,
					VIN: '90MLK23423',
					make: 'Ford',
					model: 'Focus',
					transmissionType: 'manual',
					titleStatus: 'salvage',
					mileage: 50
				},
				{
					id: 3,
					VIN: 'JKL34290SDA90',
					make: 'Hyundai',
					model: 'Elantra',
					transmissionType: 'automatic',
					titleStatus: 'clean',
					mileage: 100
				}
			]);
		});
};
