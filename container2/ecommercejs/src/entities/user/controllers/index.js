const { UserCreate } = require('../use-cases/Create')
const { dumpUser } = require('../model/dump')

const UserController = {
	createUser: async ({ userInput }) => {
		const user = await UserCreate(userInput)
		return dumpUser(user)
	}
}

module.exports = UserController
