const express = require('express');

const router = express.Router();

router.use(express.json());

const actions = require('../data/helpers/actionModel');

// crud here

// get list of actions

router.get('/', (req, res) => {
	actions
		.get()
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Error retrieving actions.', error });
		});
});
//get one actions

router.get('/:id', (req, res) => {
	const actionID = req.params.id;
	actions
		.get(actionID)
		.then(action => {
			if (actionID) {
				res.status(200).json(action);
			} else {
				res.status(404).json({ errorMessage: 'No action found with that I.D.' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'No action could be retrieved.' });
		});
});

// update one action
// action:  project_id, description, notes, completed
router.put('/:id', (req, res) => {
	const actionID = req.params.id;
	const projectID = req.body.project_id;
	const actionNotes = req.body.notes;
	const actionDescription = req.body.description;
	const actionCompleted = req.body.completed;
	actions
		.update(actionID, {
			project_id: projectID,
			notes: actionNotes,
			description: actionDescription,
			completed: actionCompleted
		})
		.then(action => {
			if (action) {
				res.status(200).json(action);
			} else {
				res.status(404).json({ errorMessage: 'No action found with that I.D.' });
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'action not updated.', error });
		});
});

// delete one action
router.delete('/:id', (req, res) => {
	const actionID = req.params.id;
	actions
		.remove(actionID)
		.then(() => {
			res.status(200).json({ message: `action ${actionID} was deleted` });
		})
		.catch(error => {
			res.status(500).json({ errorMessage: `action ${actionID} not deleted.`, error });
		});
});

// create one action
// action:  project_id, description, notes, completed
router.post('/', (req, res) => {
	const projectID = req.body.project_id;
	const actionNotes = req.body.notes;
	const actionDescription = req.body.description;
	const actionCompleted = req.body.completed;
	actions
		.insert({
			project_id: projectID,
			notes: actionNotes,
			description: actionDescription,
			completed: actionCompleted
		})
		.then(actions => {
			res.status(201).json(actions);
		})
		.catch(error => {
			res.status(404).json;
			console.log(error)({
				errorMessage: 'Could not create action'
			});
		});
});
module.exports = router;
