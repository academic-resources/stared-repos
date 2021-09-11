import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'

import { typeDefs, resolvers } from '../imports/api/'

const schema = makeExecutableSchema({ typeDefs, resolvers })

createApolloServer({ schema })