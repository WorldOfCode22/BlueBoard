const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require("graphql");

const AssignmentsType = require("./assignments-type");
module.exports = new GraphQLObjectType({
    name:"Class",
    fields:{
        name: {type: GraphQLString},
        section: {type: GraphQLString},
        admin: {type: GraphQLString},
        teacher: {type: GraphQLString},
        assignments: {type:GraphQLList(AssignmentsType)}
    }
})