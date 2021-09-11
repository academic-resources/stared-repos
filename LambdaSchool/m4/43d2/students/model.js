const db = require('../database/connection.js');

module.exports = {
	getStudents,
	getCohortStudents,
	getStudent,
	addStudent,
	updateStudent,
	removeStudent
};

// retrieving a list of students
function getStudents() {
	return db('students');
}

// retrieving a list of students from a cohort
function getCohortStudents(cohortsid) {
	return db('students').where({ 'students.cohortsid': cohortsid });
}

// retrieve student
function getStudent(studentsid) {
	return db('students').where({ 'students.studentsid': studentsid });
}

// adding student
async function addStudent(student) {
	const [id] = await db('students')
		.insert(student, 'id')
		.then(ids => {
			return db('cohorts');
		});
}

// update student
function updateStudent(newStudent, studentsid) {
	db('students')
		.where({ studentsid: studentsid })
		.update(newStudent)
		.then(ids => {
			return getStudent(studentsid);
		});
}

// delete student
async function removeStudent(studentsid) {
	let student = getStudent(studentsid);
	db('students')
		.delete()
		.where({ studentsid: studentsid });

	return student;
}
