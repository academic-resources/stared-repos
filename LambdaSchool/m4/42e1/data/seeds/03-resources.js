exports.seed = function(knex) {
	return knex('resources').insert([
		{
			resourceid: 1,
			resourcename: 'Lambda Student',
			resourcedescription: 'a soon to be hired developer'
		},
		{
			resourceid: 2,
			resourcename: 'MacBook Pro #1',
			resourcedescription: 'an overly expensive laptop computer'
		}
	]);
};
