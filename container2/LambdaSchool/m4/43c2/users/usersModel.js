const db = require('../database/dbConfig.js');

module.exports = {
	add,
	find,
	findBy,
	findById,
	findDepartment
};

function find() {
	return db('users').select('id', 'username', 'password', 'department');
}

function findBy(filter) {
	return db('users')
		.select('id', 'username', 'password', 'department')
		.where(filter);
}

async function add(user) {
	const [id] = await db('users').insert(user);

	return findById(id);
}

function findById(id) {
	return db('users')
		.select('id', 'username', 'department')
		.where({ id })
		.first();
}

function findDepartment(username) {
	let department = db('users')
		.select('department')
		.where({ username });

	return db('users')
		.select('id', 'username')
		.where({ 'users.department': department });
}
