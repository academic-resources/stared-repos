const express = require('express');

const accountRouter = require('./routers/accountRouter.js');

const server = express();

// database access using knex
const db = require('./data/dbConfig.js');

server.use(express.json());

server.use('/api/accounts', accountRouter);

// get list of accounts

server.get('/', (req, res) => {
	db('accounts')
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(error => {
			console.log(error);

			res.status(500).json({ error: 'The account list could not be retrieved.' });
		});
});

//get one account

server.get('/:id', (req, res) => {
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

server.post('/', (req, res) => {
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

server.put('/:id', (req, res) => {
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

server.delete('/:id', (req, res) => {
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

module.exports = server;
