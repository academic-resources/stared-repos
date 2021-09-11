const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const AuthService = require("../services/auth")


const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // this will be the name of this mutation
    register: {
      // creating a User type
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      // resolve(parentValue, { name, email, password }) {
      //   return new User({ name, email, password }).save();
      resolve(parentValue, data) {
        return AuthService.register(data);
      }
    }
  }
});

module.exports = mutation;
