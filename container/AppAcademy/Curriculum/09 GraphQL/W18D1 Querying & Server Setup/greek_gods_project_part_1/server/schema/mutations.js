const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const God = mongoose.model("god");
const GodType = require("./god_type");

// this will be the where we will create all of the mutations for our application
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // we are naming our filed - and therefore our mutation `newGod`
    newGod: {
      // we just specify the type we are mutating - in the case of making
      // a new God this will be the GodType
      type: GodType,
      args: {
        // the arguments required for this mutation
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      // here we are just destructing our arguments
      resolve(_, { name, type, description }) {
        return new God({ name, type, description }).save();
      }
    },
    deleteGod: {
      // we just specify the type we are mutating - in the case of making
      // a new God this will be the GodType
      type: GodType,
      args: {
        // the arguments required for this mutation
        id: { type: GraphQLID },
      },
      // here we are just destructing our arguments
      resolve(_, { id }) {
        return God.findById(id).remove()
      }
    },
    updateGod: {
      type: GodType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, { id, name, type, description }) {
        const updateObj = {};
        // we can create our own object here and pass in the variables is they exist
        updateObj.id = id;
        if (name) updateObj.name = name;
        if (type) updateObj.type = type;
        if (description) updateObj.description = description;

        return God.findOneAndUpdate({ _id: id }, { $set: updateObj }, { new: true }, (err, god) => {
          return god;
        });
      }
    },
    addGodRelative: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        relativeId: { type: GraphQLID },
        relationship: { type: GraphQLString }
      },
      resolve(parentValue, { godId, relativeId, relationship }) {
        return God.addRelative(godId, relativeId, relationship);
      }
    },
  }
});

module.exports = mutation;