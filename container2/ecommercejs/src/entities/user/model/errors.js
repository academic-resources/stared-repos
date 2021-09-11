class UserNotFound extends Error {
	constructor() {
		super('User not found')
		this.name = 'UserNotFound'
	}
}

class UserAlreadyExists extends Error {
	constructor() {
		super('User alredy exist')
		this.name = 'UserAlreadyExists'
	}
}

module.exports = {
	UserNotFound,
	UserAlreadyExists
}
