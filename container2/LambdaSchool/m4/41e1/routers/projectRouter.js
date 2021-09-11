const express = require('express');

const router = express.Router();

router.use(express.json());

const projects = require('../data/helpers/projectModel');

// get list of projects

router.get('/', (req, res) => {
	projects
		.get()
		.then(projects => {
			res.status(200).json(projects);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'The project list could not be retrieved.' });
		});
});
//get one project

router.get('/:id', (req, res) => {
	const projectID = req.params.id;
	projects
		.get(projectID)
		.then(project => {
			if (project) {
				res.status(200).json(project);
			} else {
				res.status(404).json({ errorMessage: 'No project found with that I.D.' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'No project could be retrieved.' });
		});
});

// update one project

router.put('/:id', (req, res) => {
	const projectID = req.params.id;
	const projectName = req.body.name;
	const projectDescription = req.body.description;
	projects
		.update(projectID, { name: projectName, description: projectDescription })
		.then(project => {
			if (project) {
				res.status(200).json(project);
			} else {
				res.status(404).json({ errorMessage: 'No project found with that I.D.' });
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Project not updated.', error });
		});
});

// delete one project

router.delete('/:id', (req, res) => {
	const projectID = req.params.id;
	projects
		.remove(projectID)
		.then(project => {
			if (projectID) {
				res.status(200).json({ message: `Project ${projectID} was deleted` });
			} else {
				res.status(404).json({ errorMessage: 'No project found with that I.D.' });
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: `Project ${projectID} not deleted.`, error });
		});
});
// create one project

router.post('/', (req, res) => {
	const newProject = req.body;
	const projectName = req.body.name;
	const projectDescription = req.body.description;

	projects
		.insert({ name: projectName, description: projectDescription })
		.then(project => {
			if (project) {
				res.status(200).json({ message: project });
			} else {
				res.status(404).json({ errorMessage: 'No project was created.' });
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Error adding project.', error });
		});
});

module.exports = router;
