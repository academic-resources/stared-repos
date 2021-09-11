const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const AbodeType = require("./abode_type")
const EmblemType = require("./emblem_type")
const God = require("../models/God")

const GodType = new GraphQLObjectType({
  name: "GodType",
  // wrapped in a function to create a thunk
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    // remember the GraphQLList will return us an array of domains
    domains: { type: new GraphQLList(GraphQLString) },
    abode: {
      // Gods only have one abode
      type: AbodeType,
      resolve(parentValue) {
        return Abode.findById(parentValue.abode)
          .then(abode => abode)
          .catch(err => null)
      }
    },
    emblems: {
      // Gods have many emblems so we wrap them in a list
      type: new GraphQLList(EmblemType),
      resolve(parentValue) {
        return God.findById(parentValue.id)
          .populate('emblems')
          .then(god => god.emblems);
      }
    },
    parents: {
      type: new GraphQLList(GodType),
      resolve(parentValue) {
        return God.findRelatives(parentValue.id, 'parents');
      }
    },
    children: {
      type: new GraphQLList(GodType),
      resolve(parentValue) {
        return God.findRelatives(parentValue.id, 'children');
      }
    },
    siblings: {
      type: new GraphQLList(GodType),
      resolve(parentValue) {
        return God.findRelatives(parentValue.id, 'siblings');
      }
    },
  })
});

module.exports = GodType;