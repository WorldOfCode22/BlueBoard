const{
    GraphQLObjectType,
    GraphQLString
} = require("graphql");

module.exports = new GraphQLObjectType({
    name:"User",
    fields:{
        id:{type: GraphQLString},
        username:{type: GraphQLString},
        firstName:{type: GraphQLString},
        lastName: {type: GraphQLString},
        organization:{type: GraphQLString},
        role:{type: GraphQLString}
    }
})