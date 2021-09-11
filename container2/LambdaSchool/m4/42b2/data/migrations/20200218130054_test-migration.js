exports.up = function(knex, Promise) {
	return knex.schema.createTable('cars', tbl => {
		tbl.increments();
		tbl.text('VIN', 256)
			.unique()
			.notNullable()
			.indexed();
		tbl.text('make', 256)
			.notNullable()
			.indexed();
		tbl.text('model', 256)
			.notNullable()
			.indexed();
		tbl.text('transmissionType', 256).indexed();
		tbl.text('titleStatus', 256).indexed();
		tbl.decimal('mileage').notNullable();
	});
};
exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('cars');
};
