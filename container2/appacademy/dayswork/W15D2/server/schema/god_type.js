const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const AbodeType = require("./abode_type");
const EmblemType = require("./emblem_type");
const Abode = mongoose.model("abode");
const God = mongoose.model("god");

const GodType = new GraphQLObjectType({
  name: "GodType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    domains: { type: new GraphQLList(GraphQLString) },
    abode: {
      type: AbodeType,
      resolve(parentValue) {
        return Abode.findById(parentValue.abode)
          .then(abode => abode)
          .catch(err => null);
      }
    },
    emblems: {
      type: new GraphQLList(EmblemType),
      resolve(parentValue) {
        return God.findById(parentValue.id)
          .populate("emblems")
          .then(god => god.emblems);
      }
    },
    parents: {
      type: new GraphQLList(GodType),
      resolve(parentValue) {
        return God.findRelatives(parentValue.id, "parents");
      }
    },
    children: {
      type: new GraphQLList(GodType),
      resolve(parentValue) {
        return God.findRelatives(parentValue.id, "children");
      }
    },
    siblings: {
      type: new GraphQLList(GodType),
      resolve(parentValue) {
        return God.findRelatives(parentValue.id, "siblings");
      }
    }
  })
});

module.exports = GodType;
