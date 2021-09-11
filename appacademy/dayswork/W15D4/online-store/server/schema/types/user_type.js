const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    token: { type: GraphQLString }
  })
})

module.exports = UserType
