exports.seed = function(knex) {
	return knex('tasks').insert([
		{
			taskid: 1,
			projectid: 1,
			taskdescription: 'task description',
			tasknotes: 'the task notes',
			taskcompleted: false // or true
		},
		{
			taskid: 7,
			projectid: 1,
			taskdescription: 'another task description',
			tasknotes: 'the task notes',
			taskcompleted: false // or true
		}
	]);
};
