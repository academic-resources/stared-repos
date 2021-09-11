exports.seed = function(knex) {
	return knex('recipesingredients').insert([
		{
			recipeid: 1,
			ingredientsid: 3
		},
		{
			recipeid: 1,
			ingredientsid: 4
		},
		{
			recipeid: 4,
			ingredientsid: 2
		},
		{
			recipeid: 3,
			ingredientsid: 1
		},
		{
			recipeid: 2,
			ingredientsid: 3
		},
		{
			recipeid: 2,
			ingredientsid: 6
		},
		{
			recipeid: 3,
			ingredientsid: 6
		},
		{
			recipeid: 4,
			ingredientsid: 5
		},
		{
			recipeid: 5,
			ingredientsid: 4
		},
		{
			recipeid: 6,
			ingredientsid: 5
		},
		{
			recipeid: 5,
			ingredientsid: 3
		}
	]);
};
