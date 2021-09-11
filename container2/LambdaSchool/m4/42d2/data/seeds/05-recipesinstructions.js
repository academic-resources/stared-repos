exports.seed = function(knex) {
	return knex('recipesinstructions').insert([
		{
			recipeid: 1,
			instructionsid: 3
		},
		{
			recipeid: 1,
			instructionsid: 4
		},
		{
			recipeid: 4,
			instructionsid: 2
		},
		{
			recipeid: 3,
			instructionsid: 1
		},
		{
			recipeid: 2,
			instructionsid: 5
		},
		{
			recipeid: 2,
			instructionsid: 15
		},
		{
			recipeid: 3,
			instructionsid: 16
		},
		{
			recipeid: 4,
			instructionsid: 14
		},
		{
			recipeid: 5,
			instructionsid: 13
		},
		{
			recipeid: 6,
			instructionsid: 12
		},
		{
			recipeid: 5,
			instructionsid: 11
		}
	]);
};
