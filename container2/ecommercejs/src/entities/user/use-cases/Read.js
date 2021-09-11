const { User } = require('../model')
const { UserNotFound } = require('../model/errors')

const UserGetByEmail = async (email) => {
	const user = await User.findOne({ email })
	if (!user) throw new UserNotFound()
	return user
}

module.exports = {
	UserGetByEmail
}
