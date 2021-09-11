exports.seed = function(knex) {
	// the database will return 1 for true and 0 for false
	// extra code is required to convert 1 to true & 0 to false.
	return knex('projects').insert([
		{
			projectid: 1,
			projectname: 'project name here',
			projectdescription: 'the project description',
			projectcompleted: false
		}
	]);
};
