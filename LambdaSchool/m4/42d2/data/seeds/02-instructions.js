exports.seed = function(knex) {
	return knex('instructions').insert([
		{
			instructionsid: 1,
			stepnumber: 1,
			instruction: 'solve prime number theory'
		},
		{ instructionsid: 2, stepnumber: 2, instruction: 'crack cyber security' },
		{
			instructionsid: 3,
			stepnumber: 3,
			instruction: 'blackmail world leaders'
		},
		{
			instructionsid: 4,
			stepnumber: 1,
			instruction: 'collect all the sheep in Scotland'
		},
		{ instructionsid: 5, stepnumber: 4, instruction: 'profit' },
		{
			instructionsid: 6,
			stepnumber: 2,
			instruction: 'find Japanese investors'
		},
		{ instructionsid: 7, stepnumber: 3, instruction: '????' },
		{ instructionsid: 8, stepnumber: 2, instruction: 'put the flea in a box' },
		{
			instructionsid: 9,
			stepnumber: 4,
			instruction: 'smash it with a hammer (evil laugh)'
		},
		{
			instructionsid: 10,
			stepnumber: 1,
			instruction: 'turn your enemy into a flea'
		},
		{
			instructionsid: 11,
			stepnumber: 3,
			instruction: 'mail the box to yourself and when it arrives...'
		},
		{
			instructionsid: 12,
			stepnumber: 1,
			instruction: 'write a bot to randomly like posts and follow pages'
		},
		{
			instructionsid: 13,
			stepnumber: 3,
			instruction: 'try to ignore the persisent feeling of loneliness and disconnection'
		},
		{
			instructionsid: 14,
			stepnumber: 2,
			instruction: 'watch instagram followers increase'
		},
		{
			instructionsid: 15,
			stepnumber: 4,
			instruction: '...and quest some more'
		},
		{
			instructionsid: 16,
			stepnumber: 4,
			instruction: 'seamlessly take their place'
		},
		{
			instructionsid: 17,
			stepnumber: 3,
			instruction: 'artfully craft accessories'
		},
		{ instructionsid: 18, stepnumber: 2, instruction: 'procure facial hair' },
		{
			instructionsid: 19,
			stepnumber: 1,
			instruction: "steal coworker's name tag"
		}
	]);
};
