const UserSchema = {
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}

module.exports = { UserSchema }
