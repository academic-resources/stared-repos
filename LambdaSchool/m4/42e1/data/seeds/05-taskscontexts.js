exports.seed = function(knex) {
	return knex('projectsresources').insert([
		{
			taskid: 1,
			contextid: 1
		},
		{
			taskid: 2,
			contextid: 2
		},
		{
			taskid: 3,
			contextid: 3
		}
	]);
};
