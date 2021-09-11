const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql
const mongoose = require('mongoose')
const UserType = require('./user_type')
const PostType = require('./post_type')

const User = mongoose.model('user')
const Post = mongoose.model('post')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    newUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, { name, email, password }) {
        return new User({ name, email, password }).save()
      }
    },
    newPost: {
      type: PostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, { title, body, author }) {
        return new Post({ title, body, author }).save()
      }
    }
  }
})

module.exports = mutation
