const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

// get list of accounts

router.get('/', (req, res) => {
	db.select('*')
		.from('accounts')
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(error => {
			console.log(error);

			res.status(500).json({ error: 'The account list could not be retrieved.' });
		});
});

//get one account

router.get('/:id', (req, res) => {
	const accountID = req.params.id;
	db('accounts')
		.where({ id: accountID })
		.then(account => {
			if (account) {
				res.status(200).json(account);
			} else {
				res.status(404).json({ errorMessage: 'No account found with that I.D.' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'No account could be retrieved.' });
		});
});

// create one account

router.post('/', (req, res) => {
	const newaccount = req.body;
	const accountName = req.body.name;
	const accountBudget = req.body.budget;

	db('accounts')
		.insert({ name: accountName, budget: accountBudget }, 'id')
		.then(account => {
			if (account) {
				res.status(200).json({ message: account });
			} else {
				res.status(404).json({ errorMessage: 'No account was created.' });
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Error adding account.', error });
		});
});

// update one account

router.put('/:id', (req, res) => {
	const accountID = req.params.id;
	const accountName = req.body.name;
	const accountBudget = req.body.budget;
	db('accounts')
		.where({ id: accountID })
		.update(accountID, { name: accountName, budget: accountBudget })
		.then(account => {
			if (account) {
				res.status(200).json(account);
			} else {
				res.status(404).json({ errorMessage: 'No account found with that I.D.' });
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Account not updated.', error });
		});
});

// delete one account

router.delete('/:id', (req, res) => {
	const accountID = req.params.id;
	db('accounts')
		.delete(accountID)
		.where({ id: accountID })
		.then(account => {
			if (accountID) {
				res.status(200).json({ message: `account ${accountID} was deleted` });
			} else {
				res.status(404).json({ errorMessage: 'No account found with that I.D.' });
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: `account ${accountID} not deleted.`, error });
		});
});

module.exports = router;

function getById(id) {
	return db('posts')
		.where({ id })
		.first();
}
