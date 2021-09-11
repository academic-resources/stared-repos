const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Emblem = mongoose.model('emblem');

const EmblemType = new GraphQLObjectType({
  name: 'EmblemType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gods: {
      type: new GraphQLList(require('./god_type')),
      resolve(parentValue) {
        return Emblem.findById(parentValue.id)
          .populate('gods')
          .then(emblem => {
            return emblem.gods;
          });
      }
    }
  })
});

module.exports = EmblemType;
