const graphql = require('graphql');
const { GraphQLSchema } = graphql;
const mutations = require('./mutations');
const RootQueryType = require('./root_query_type');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});
