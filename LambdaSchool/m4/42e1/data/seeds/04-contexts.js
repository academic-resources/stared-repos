exports.seed = function(knex) {
	return knex('contexts').insert([
		{
			contextid: 1,
			contextname: 'at home'
		},
		{
			contextid: 2,
			contextname: 'at work'
		},
		{
			contextid: 3,
			contextname: 'at computer'
		}
	]);
};
