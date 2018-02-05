const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInputObjectType
} = require("graphql");

const AssignmentsType = require("./assignments-type");
const UserType = require("./user-type");
module.exports = new GraphQLObjectType({
    name:"Class",
    fields:{
        id:{type: GraphQLString},
        name: {type: GraphQLString},
        section: {type: GraphQLString},
        organization: {type: GraphQLString},
        teacher: {type: GraphQLString},
        assignments: {type: GraphQLList(AssignmentsType)},
        students: {type: GraphQLList(UserType)},
    }
})

module.exports.InputType = new GraphQLInputObjectType({
    name:"ClassInputType",
    fields:{
        id:{type: GraphQLString},
        name: {type: GraphQLString},
        section: {type: GraphQLString},
        admin: {type: GraphQLString},
        teacher: {type: GraphQLString},
        assignments: {type: GraphQLList(AssignmentsType.InputType)},
        students: {type: GraphQLList(UserType.InputType)}
    }
})
