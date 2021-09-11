const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const axios = require("axios");

const WizardType = new GraphQLObjectType({
  name: "Wizard",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    house: {
      type: HouseType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/houses/${parentValue.houseId}`)
          .then(res => res.data);
      }
    },
    patronus: {
      type: PatronusType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/patronuses/${parentValue.patronusId}`)
          .then(res => res.data);
      }
    },
    wands: {
      type: new GraphQLList(WandType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/wizards/${parentValue.id}/wands`)
          .then(res => res.data);
      }
    }
  })
});

const HouseType = new GraphQLObjectType({
  name: "House",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    founder: { type: GraphQLString },
    wizards: {
      type: new GraphQLList(WizardType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/houses/${parentValue.id}/wizards`)
          .then(res => res.data);
      }
    },
    ghost: { type: GraphQLString },
    animal: { type: GraphQLString }
  })
});

const WandType = new GraphQLObjectType({
  name: "Wand",
  fields: () => ({
    id: { type: GraphQLInt },
    wizard: {
      type: WizardType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/wizards/${parentValue.wizardId}`)
          .then(res => res.data);
      }
    },
    wood: { type: GraphQLString },
    length: { type: GraphQLString },
    core: { type: GraphQLString }
  })
});

const PatronusType = new GraphQLObjectType({
  name: "Patronus",
  fields: () => ({
    id: { type: GraphQLInt },
    form: { type: GraphQLString },
    wizards: {
      type: new GraphQLList(WizardType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/patronuses/${parentValue.id}/wizards`)
          .then(res => res.data);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    wizard: {
      type: WizardType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/wizards/${args.id}`)
          .then(res => res.data);
      }
    },
    wizards: {
      type: new GraphQLList(WizardType),
      resolve() {
        return axios
          .get(`http://localhost:3000/wizards/`)
          .then(res => res.data);
      }
    },
    house: {
      type: HouseType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/houses/${args.id}`)
          .then(res => res.data);
      }
    },
    houses: {
      type: new GraphQLList(HouseType),
      resolve() {
        return axios.get(`http://localhost:3000/houses/`).then(res => res.data);
      }
    },
    wand: {
      type: WandType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/wands/${args.id}`)
          .then(res => res.data);
      }
    },
    wands: {
      type: new GraphQLList(WandType),
      resolve() {
        return axios.get(`http://localhost:3000/wands/`).then(res => res.data);
      }
    },
    patronus: {
      type: PatronusType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/patronuses/${args.id}`)
          .then(res => res.data);
      }
    },
    patronuses: {
      type: new GraphQLList(PatronusType),
      resolve() {
        return axios
          .get(`http://localhost:3000/patronuses/`)
          .then(res => res.data);
      }
    }
  }
});

//  all our mutations will leave here on the mutations object
const mutation = new GraphQLObjectType({
  name: "Mutation",
  // all the different fields will be the different types of mutations that can be added
  fields: {
    addWizard: {
      // specify that we wand to effect the Wizard Type
      type: WizardType,
      //  the arguments being passed in
      args: {
        // GraphQLNonNull means that this is a necessary argument for this operation
        name: { type: new GraphQLNonNull(GraphQLString) },
        houseId: { type: new GraphQLNonNull(GraphQLInt) },
        patronusId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      //  the resolve function will always take in the parentValue and the arguments (args above)
      resolve(parentValue, { name, houseId, patronusId }) {
        // we are using axios to talk to our basic JSON server sitting in the background
        return axios
          .post("http://localhost:3000/wizards", { name, houseId, patronusId })
          .then(res => res.data);
      }
    },
    updateWizard: {
      type: WizardType,
      args: {
        // with update we do thing a little differently
        // we don't want GraphQL to write over all the arguments that weren't passed in
        id: { type: new GraphQLNonNull(GraphQLInt) },
        // these arguments are optional (maybe you only want to update a name and nothing else)
        // so we don't include the GraphQLNonNull
        name: { type: GraphQLString },
        houseId: { type: GraphQLInt },
        patronusId: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        // The json server is smart enough to ignore if there is any id in the args object
        // so we don't have to worry about it updating an id by mistake.
        // The json server will also take care of relational data for us by deleting any
        // wands corresponding to this wizard record.
        return axios
          .patch(`http://localhost:3000/wizards/${args.id}`, args)
          .then(res => res.data);
      }
    },
    deleteWizard: {
      type: WizardType,
      // all we need to delete the user is the id
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, { id }) {
        // making a delete type request
        return axios
          .delete(`http://localhost:3000/wizards/${id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
