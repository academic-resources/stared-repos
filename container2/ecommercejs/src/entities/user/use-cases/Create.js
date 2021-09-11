const bcrypt = require('bcrypt')
const { User } = require('../model')
const { UserNotFound, UserAlreadyExists } = require('../model/errors')
const { UserGetByEmail } = require('./Read')

const UserCreate = async ({ email, password }) => {
	try {
		const prevUser = await UserGetByEmail(email)
		if (prevUser) throw new UserAlreadyExists()
	} catch (err) {
		console.log(err)
		if (err instanceof UserNotFound) {
			const pwd = await bcrypt.hash(password, 12)
			const user = new User({ email, password: pwd });
			return user.save()
		} else {
			throw err
		}
	}
}

module.exports = { UserCreate }