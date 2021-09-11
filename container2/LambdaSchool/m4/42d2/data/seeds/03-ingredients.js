exports.seed = function(knex) {
	return knex('ingredients').insert([
		{
			ingredientsid: 1,
			ingredientname: 'flour'
		},
		{
			ingredientsid: 2,
			ingredientname: 'sugar'
		},
		{
			ingredientsid: 3,
			ingredientname: 'eggs'
		},
		{
			ingredientsid: 4,
			ingredientname: 'chocolate chips'
		},
		{
			ingredientsid: 5,
			ingredientname: 'milk'
		},
		{
			ingredientsid: 6,
			ingredientname: 'chocolate syrup'
		}
	]);
};
