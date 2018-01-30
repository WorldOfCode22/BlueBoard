const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType
} = require("graphql");

module.exports = new GraphQLObjectType({
    name:"Assignments",
    fields:{
        startDate:{type: GraphQLString},
        endDate: {type: GraphQLString},
        title: {type: GraphQLString},
        details:{type:GraphQLString},
        type:{type:GraphQLString}
    }
})

module.exports.InputType = new GraphQLInputObjectType({
    name:"AssignmentsInputType",
    fields:{
        startDate:{type: GraphQLString},
        endDate: {type: GraphQLString},
        title: {type: GraphQLString},
        details:{type:GraphQLString},
        type:{type:GraphQLString}
    }
})