import { Random } from 'meteor/random'

export const resolvers = {
  Query: {
    user(root, args, context) {
      return context.user
    },
  },
  User: {
    emails: ({ emails }) => emails,
    randomString: () => Random.id()
  },
  Query: {
    hi: () => 'Hello!'
  },
}