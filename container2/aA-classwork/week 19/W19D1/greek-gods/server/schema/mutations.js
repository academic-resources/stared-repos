const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} = graphql;
const mongoose = require('mongoose');
const God = mongoose.model('god');
const Emblem = mongoose.model('emblem');
const Abode = mongoose.model('abode');
const GodType = require('./god_type');
const AbodeType = require('./abode_type');
const EmblemType = require('./emblem_type');

// this will be the where we will create all of the mutations for our application
const mutation = new GraphQLObjectType({
  // we give it a name
  name: 'Mutation',
  // then in the fields we will enter all of our different mutations
  fields: {
    newGod: {
      type: GodType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, { name, type, description }) {
        return new God({ name, type, description }).save();
      }
    },
    deleteGod: {
      type: GodType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return God.deleteOne({ _id: id });
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
        updateObj.id = id;
        if (name) updateObj.name = name;
        if (type) updateObj.type = type;
        if (description) updateObj.description = description;

        return God.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, god) => {
            return god;
          }
        );
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
    removeGodRelative: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        relativeId: { type: GraphQLID },
        relationship: { type: GraphQLString }
      },
      resolve(parentValue, { godId, relativeId, relationship }) {
        return God.removeRelative(godId, relativeId, relationship);
      }
    },
    addGodEmblem: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        emblemId: { type: GraphQLID }
      },
      resolve(parentValue, { godId, emblemId }) {
        return God.addEmblem(godId, emblemId);
      }
    },
    removeGodEmblem: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        emblemId: { type: GraphQLID }
      },
      resolve(parentValue, { godId, emblemId }) {
        return God.removeEmblem(godId, emblemId);
      }
    },
    updateGodAbode: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        abodeId: { type: GraphQLID }
      },
      resolve(parentValue, { godId, abodeId }) {
        return God.updateAbode(godId, abodeId);
      }
    },
    addGodDomain: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        domain: { type: GraphQLString }
      },
      resolve(parentValue, { godId, domain }) {
        return God.addDomain(godId, domain);
      }
    },
    removeGodDomain: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        domain: { type: GraphQLString }
      },
      resolve(parentValue, { godId, domain }) {
        return God.findById(godId).then(god => {
          let pos = god.domains.indexOf(domain);
          god.domains.splice(pos, 1);
          return god.save().then(god => god);
        });
      }
    },
    newAbode: {
      type: AbodeType,
      args: {
        name: { type: GraphQLString },
        coordinates: { type: GraphQLString }
      },
      resolve(parentValue, { name, coordinates }) {
        return new Abode({ name, coordinates }).save();
      }
    },
    deleteAbode: {
      type: AbodeType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Abode.remove({ _id: id });
      }
    },
    updateAbode: {
      type: AbodeType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        coordinates: { type: GraphQLString }
      },
      resolve(parentValue, { id, name, coordinates }) {
        const updateObj = {};
        updateObj.id = id;
        if (name) updateObj.name = name;
        if (coordinates) updateObj.coordinates = coordinates;

        return Abode.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, abode) => abode
        );
      }
    },
    newEmblem: {
      type: EmblemType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }) {
        return new Emblem({ name }).save();
      }
    },
    deleteEmblem: {
      type: EmblemType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Emblem.remove({ _id: id });
      }
    },
    updateEmblem: {
      type: EmblemType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(parentValue, { id, name }) {
        return Emblem.findOneAndUpdate(
          { _id: id },
          { $set: { name } },
          { new: true },
          (err, emblem) => emblem
        );
      }
    }
  }
});

module.exports = mutation;
