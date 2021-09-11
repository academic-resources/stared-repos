const schema = require('./schema')
const resolver = require('./resolver')

module.exports = {
	schema,
	rootValue: resolver,
	graphiql: true
}
