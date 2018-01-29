const{
    GraphQLObjectType,
    GraphQLString
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