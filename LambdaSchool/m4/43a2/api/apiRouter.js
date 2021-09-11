const bcrypt = require('bcryptjs');
const router = require('express').Router();

const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/usersRouter.js');
const restricted = require('../auth/restrictedMW.js');

router.use('/', authRouter);
router.use('/restricted/users', restricted, usersRouter);

router.get('/hash', (req, res) => {
	const authentication = req.headers.authentication;

	const hash = bcrypt.hashSync(authentication, 8);

	res.json({ originalValue: authentication, hashedValue: hash });
});

router.get('/', (req, res) => {
	res.json({ api: "You're logged in!" });
});

module.exports = router;
