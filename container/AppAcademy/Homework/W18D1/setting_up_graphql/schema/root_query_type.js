const graphql = require("graphql");
const mongoose = require("mongoose");
const UserType = require("./user_type");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID } = graphql;
  
const User = mongoose.model("user");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
      return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id)
      }
    }
  }
});

module.exports = RootQuery;