const {GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLList,} = require('graphql');


module.exports = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    organization: { type: GraphQLString },
    role: { type: GraphQLString },
    classes: { type: GraphQLList(GraphQLString) },
  },
});

module.exports.InputType = new GraphQLInputObjectType({
  name: 'UserInputType',
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    organization: { type: GraphQLString },
    role: { type: GraphQLString },
  },
});
