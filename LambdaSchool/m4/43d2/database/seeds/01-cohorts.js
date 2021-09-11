exports.seed = function(knex) {
	return knex('cohorts').insert([
		{
			cohortsid: 1,
			cohort: 'WEB26'
		},
		{
			cohortsid: 2,
			cohort: 'WEBPT15'
		},
		{
			cohortsid: 3,
			cohort: 'UX10'
		},
		{
			cohortsid: 4,
			cohort: 'DSPT05'
		},
		{
			cohortsid: 5,
			cohort: 'WEB20'
		},
		{
			cohortsid: 6,
			cohort: 'WEB27'
		}
	]);
};
