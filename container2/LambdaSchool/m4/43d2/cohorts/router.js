const Cohorts = require('./model.js');

const router = require('express').Router();

/*
router.get('/', (req, res) => {
	Cohorts.all()
		.then(cohorts => {
			res.status(200).json(cohorts);
		})
		.catch(({ name, message, stack, code }) => {
			console.log({ name, message, stack, code });

			res.status(500).json({ name, message, stack, code });
		});
});
*/

// get list of cohorts
router.get('/', (req, res) => {
	Cohorts.getCohorts()
		.then(cohorts => {
			if (cohorts) {
				res.json(cohorts);
			} else {
				res.status(404).json({ message: 'Could not find cohorts.' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get cohorts' });
		});
});

// get one cohort
router.get('/:cohortsid', (req, res) => {
	const id = req.params.cohortsid;

	Cohorts.getCohort(id)
		.then(cohort => {
			if (cohort) {
				res.json(cohort);
			} else {
				res.status(404).json({ message: 'Could not find cohort with given id.' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get cohort' });
		});
});

// create cohort
router.post('/', (req, res) => {
	const resourceData = req.body;

	Cohorts.addCohort(resourceData)
		.then(cohort => {
			res.status(201).json(cohort);
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to create new cohort' });
		});
});

//update cohort

router.put('/:cohortsid', (req, res) => {
	const cohortsid = req.params.cohortsid;
	const cohortName = req.body.cohort;
	const updatedCohort = { cohortsid: cohortsid, cohort: cohortName };

	Cohorts.updateCohort(updatedCohort, cohortsid)
		.then(cohort => {
			if (cohort) {
				res.json(cohort);
			} else {
				res.status(404).json({ message: 'Could not find cohort with given id' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to update cohort' });
		});
});

// delete cohort
router.delete('/:cohortsid', (req, res) => {
	const id = req.params.cohortsid;

	Cohorts.removeCohort(id)
		.then(deleted => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res.status(404).json({ message: 'Could not find cohort with given id' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to delete cohort' });
		});
});

module.exports = router;
