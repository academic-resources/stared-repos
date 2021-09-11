const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Emblem = mongoose.model("emblem");

const EmblemType = new GraphQLObjectType({
  name: "EmblemType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    // this is the new field we are adding to be able to return the GodType
    gods: {
      // we are requiring the GodType here inside the thunk
      // to get around the problem of circular dependencies
      type: new GraphQLList(require("./god_type")),
      // we don't need to take in an argument since the Emblem will already have Gods related to it
      resolve(parentValue) {
        // we take advantage of parentValue which in this case is the emblem we are
        // preforming this query on
        return Emblem.findById(parentValue.id).populate("gods")
          .then(emblem => emblem.gods)
      }
    }
  })
});

module.exports = EmblemType;