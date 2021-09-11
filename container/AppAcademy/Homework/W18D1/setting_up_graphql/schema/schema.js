const graphql = require("graphql");
const { GraphQLSchema } = graphql;

const RootQueryType = require("./root_query_type");

module.exports = new GraphQLSchema({
  // this is the root query object you just created!
  query: RootQueryType
});