const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const GodType = require("./god_type");
const AbodeType = require("./abode_type");
const EmblemType = require("./emblem_type");
const God = mongoose.model("god");
const Abode = mongoose.model("abode");
const Emblem = mongoose.model("emblem");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    gods: {
      type: new GraphQLList(GodType),
      resolve() {
        return God.find({});
      }
    },
    god: {
      type: GodType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return God.findById(id);
      }
    },
    abodes: {
      type: new GraphQLList(AbodeType),
      resolve() {
        return Abode.find({});
      }
    },
    abode: {
      type: AbodeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Abode.findById(id);
      }
    },
    emblems: {
      type: new GraphQLList(EmblemType),
      resolve() {
        return Emblem.find({});
      }
    },
    emblem: {
      type: EmblemType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Emblem.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
