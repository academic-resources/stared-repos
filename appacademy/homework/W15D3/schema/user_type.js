const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = graphql

const mongoose = require('mongoose')
const User = mongoose.model('user')

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID }, // Mongoose automatically generates an ID field for our models
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    posts: {
      type: new GraphQLList(require('./post_type')),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate('posts')
          .then(user => user.posts)
      }
    },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  })
})

module.exports = UserType
