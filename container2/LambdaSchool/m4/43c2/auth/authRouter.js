const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/usersModel.js');
const { jwtSecret } = require('../config/secrets.js');

router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
	user.password = hash;

	Users.add(user)
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				Users.findDepartment(username)
					.then(departments => {
						res.status(200).json(departments);
					})
					.catch(error => {
						console.log('ERROR: ', error);
						res.status(500).json({ error: '/login error' });
					});
			} else {
				res.status(401).json({ message: 'invalid credentials' });
			}
		})
		.catch(error => {
			console.log('ERROR: ', error);
			res.status(500).json({ error: '/login error' });
		});
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
		role: user.role || 'user'
	};

	const options = {
		expiresIn: '1h'
	};

	return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
