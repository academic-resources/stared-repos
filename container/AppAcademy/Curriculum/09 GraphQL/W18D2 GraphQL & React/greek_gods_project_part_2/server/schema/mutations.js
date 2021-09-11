const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql
const mongoose = require('mongoose')
const God = mongoose.model('god')
const GodType = require('./god_type')
const Abode = mongoose.model('abode')
const AbodeType = require('./abode_type')
const Emblem = mongoose.model('emblem')
const EmblemType = require('./emblem_type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    newGod: {
      type: GodType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, { name, type, description }) {
        return new God({ name, type, description }).save()
      }
    },
    deleteGod: {
      type: GodType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return God.remove({ _id: id })
      }
    },
    updateGod: {
      type: GodType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString },
        domains: { type: GraphQLList(GraphQLString) }
      },
      resolve(parentValue, { id, name, type, description, domains }) {
        const updateObj = {}

        if (id) updateObj.id = id
        if (name) updateObj.name = name
        if (type) updateObj.type = type
        if (description) updateObj.description = description
        if (domains) updateObj.domains = domains

        return God.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, god) => {
            return god
          }
        )
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
        return God.addRelative(godId, relativeId, relationship)
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
        return God.removeRelative(godId, relativeId, relationship)
      }
    },
    addGodEmblem: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        emblemId: { type: GraphQLID }
      },
      resolve(parentValue, { godId, emblemId }) {
        return God.addEmblem(godId, emblemId)
      }
    },
    removeGodEmblem: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        emblemId: { type: GraphQLID }
      },
      resolve(parentValue, { godId, emblemId }) {
        return God.removeEmblem(godId, emblemId)
      }
    },
    updateGodAbode: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        abodeId: { type: GraphQLID }
      },
      resolve(parentValue, { godId, abodeId }) {
        return God.updateAbode(godId, abodeId)
      }
    },
    addGodDomain: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        domain: { type: GraphQLString }
      },
      resolve(parentValue, { godId, domain }) {
        return God.addDomain(godId, domain)
      }
    },
    removeGodDomain: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        domain: { type: GraphQLString }
      },
      resolve(parentValue, { godId, domain }) {
        return God.removeDomain(godId, domain)
      }
    },
    newAbode: {
      type: AbodeType,
      args: {
        name: { type: GraphQLString },
        coordinates: { type: GraphQLString }
      },
      resolve(parentValue, { name, coordinates }) {
        return new Abode({ name, coordinates }).save()
      }
    },
    deleteAbode: {
      type: AbodeType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Abode.remove({ _id: id })
      }
    },
    updateAbode: {
      type: AbodeType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(parentValue, { id, name }) {
        return Abode.findOneAndUpdate(
          { _id: id },
          { $set: { name } },
          { new: true },
          (err, abode) => {
            return abode
          }
        )
      }
    },
    newEmblem: {
      type: EmblemType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }) {
        return new Emblem({ name }).save()
      }
    },
    deleteEmblem: {
      type: EmblemType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Emblem.remove({ _id: id })
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
          (err, emblem) => {
            return emblem
          }
        )
      }
    }
  }
})

module.exports = mutation
