const { buildSchema } = require('graphql')
const { Product, ProductInput, ProductQueries, ProductMutations } = require('./product')
const { User, UserInput, UserMutations } = require('./user')
const { Category, CategoryInput, CategoryQueries, CategoryMutations } = require('./category')

module.exports = buildSchema(`
	${Product}
	${User}
	${Category}

	${ProductInput}
	${UserInput}
	${CategoryInput}

	type RootQuery {
		${ProductQueries}
		${CategoryQueries}
	}

	type RootMutation {
		${ProductMutations}
		${UserMutations}
		${CategoryMutations}
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`)
