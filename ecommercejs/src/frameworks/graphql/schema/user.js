const User = `type User {
	_id: ID!
	email: String!
	password: String
}`

const UserInput = `input UserInput {
	email: String!
	password: String
}`

const UserMutations = `createUser(userInput: UserInput): User`

module.exports = {
	User,
	UserInput,
	UserMutations
}
