exports.seed = function(knex) {
	return knex('projectsresources').insert([
		{
			projectid: 1,
			resourceid: 2
		},
		{
			projectid: 1,
			resourceid: 1
		}
	]);
};
