exports.seed = function(knex) {
	return knex('recipes').insert([
		{ recipename: 'World Domination' },
		{ recipename: 'Get Rich Quick' },
		{ recipename: 'Revenge' },
		{ recipename: 'More Instagram Followers' },
		{ recipename: 'Find the Holy Grail' },
		{ recipename: "Steal Coworker's Identity" }
	]);
};
