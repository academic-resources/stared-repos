exports.up = function(knex) {
	return knex.schema
		.createTable('recipes', tbl => {
			tbl.increments('recipeid');
			tbl.text('recipename', 128)
				.unique()
				.notNullable();
		})
		.createTable('instructions', tbl => {
			tbl.increments('instructionsid');
			tbl.integer('stepnumber')
				.unsigned()
				.notNullable();
			tbl.text('instruction').notNullable();
		})
		.createTable('ingredients', tbl => {
			tbl.increments('ingredientsid');
			tbl.text('ingredientname').notNullable();
		})
		.createTable('recipesingredients', tbl => {
			tbl.integer('recipeid')
				.unsigned()
				.notNullable()
				.references('recipeid')
				.inTable('recipes')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			tbl.integer('ingredientsid')
				.unsigned()
				.notNullable()
				.references('ingredientsid')
				.inTable('ingredients')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		})
		.createTable('recipesinstructions', tbl => {
			tbl.integer('recipeid')
				.unsigned()
				.notNullable()
				.references('recipeid')
				.inTable('recipes')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			tbl.integer('instructionsid')
				.unsigned()
				.notNullable()
				.references('instructionsid')
				.inTable('instructions')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists('instructions')
		.dropTableIfExists('ingredients')
		.dropTableIfExists('recipes')
		.dropTableIfExists('recipesingredients')
		.dropTableIfExists('recipesinstructions');
};
