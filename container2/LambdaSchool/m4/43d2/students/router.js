const router = require('express').Router();

const Students = require('./model.js');

/*
router.get('/', (req, res) => {
	res.json({ router: 'students' });
});

// get list of students
router.get('/students', (req, res) => {
	res.status(201).json({ router: 'students' });
});
*/

// get list of students
router.get('/', (req, res) => {
	Students.getStudents()
		.then(students => {
			if (students) {
				res.json(students);
			} else {
				res.status(404).json({ message: 'Could not find students.' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get students' });
		});
});

// get one student
router.get('/:studentid', (req, res) => {
	const id = req.params.studentsid;

	Students.getStudent(id)
		.then(student => {
			if (student) {
				res.json(student);
			} else {
				res.status(404).json({ message: 'Could not find student with given id.' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get tasks' });
		});
});

// create student

router.post('/', (req, res) => {
	const resourceData = req.body;

	Students.addStudent(resourceData)
		.then(student => {
			res.status(201).json(student);
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to create new student' });
		});
});

//update student

router.put('/:studentsid', (req, res) => {
	const studentsid = req.params.studentsid;
	const studentName = req.body.name;
	const cohortsid = req.body.cohortsid;
	const updatedStudent = { studentsid: studentsid, name: studentName, cohortsid: cohortsid };

	Students.updateStudent(updatedStudent, studentid)
		.then(student => {
			if (student) {
				res.json(student);
			} else {
				res.status(404).json({ message: 'Could not find student with given id' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to update student' });
		});
});

// delete student
router.delete('/:studentsid', (req, res) => {
	const id = req.params.studentid;

	Students.removeStudent(id)
		.then(deleted => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res.status(404).json({ message: 'Could not find student with given id' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to delete student' });
		});
});

module.exports = router;
