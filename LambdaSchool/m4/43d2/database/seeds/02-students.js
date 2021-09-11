exports.seed = function(knex) {
	return knex('students').insert([
		{
			studentsid: 1,
			cohortsid: 1,
			name: 'John Doe'
		},
		{
			studentsid: 2,
			cohortsid: 2,
			name: 'Jane Doe'
		},
		{
			studentsid: 3,
			cohortsid: 3,
			name: 'Susan Smith'
		},
		{
			studentsid: 4,
			cohortsid: 4,
			name: 'Tommy Smith'
		},
		{
			studentsid: 5,
			cohortsid: 5,
			name: 'Domino Noid'
		}
	]);
};
