exports.up = function(knex) {
	return knex.schema
		.createTable('cohorts', tbl => {
			tbl.increments('cohortsid');
			tbl.text('cohort', 128)
				.unique()
				.notNullable();
		})
		.createTable('students', tbl => {
			tbl.increments('studentsid');
			tbl.text('name', 128);
			tbl.integer('cohortsid')
				.unsigned()
				.notNullable()
				.references('cohortsid')
				.inTable('cohorts')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('cohorts').dropTableIfExists('students');
};
