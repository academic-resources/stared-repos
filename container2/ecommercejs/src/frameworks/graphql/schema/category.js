const Category = `type Category {
	_id: ID!
	title: String!
	description: String!
	products: [Product!]
}`

const CategoryInput = `input CategoryInput {
	title: String!
	description: String!
}`

const CategoryQueries = `categories: [Category!]!`

const CategoryMutations = `createCategory(categoryInput: CategoryInput): Category`

module.exports = {
	Category,
	CategoryInput,
	CategoryQueries,
	CategoryMutations
}
