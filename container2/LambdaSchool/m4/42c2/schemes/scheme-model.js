const db = require('../data/db-config');

module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
	remove
};

function find() {
	return db('schemes');
}
function findById(id) {
	return db('schemes')
		.where({ id })
		.first();
}

function findSteps(id) {
	return db('schemes')
		.where({ id })
		.first();
}
function add(scheme) {
	db('schemes')
		.insert(scheme)
		.then(ids => {
			return findById(ids[0]);
		});
}
function update(newScheme, id) {
	db('schemes')
		.where({ id })
		.update(newScheme)
		.then(ids => {
			return ids;
		});
}

function remove(id) {
	let scheme = findById(id);
	db('schemes')
		.delete()
		.where({ id: id })
		.then(ids => {
			return scheme;
		});
}

function update(id, changes) {
	return db('users')
		.where({ id })
		.update(changes);
}
