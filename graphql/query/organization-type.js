const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList
} = require("graphql");

const UserType = require("./user-type");
const ClassType = require("./class-type");

module.exports = new GraphQLObjectType({
   name:"Organization",
   fields:{
       id: {type: GraphQLString},
       name:{type:GraphQLString},
       classes: {type:GraphQLList(ClassType)},
       teachers: {type:GraphQLList(UserType)},
       students: {type:GraphQLList(UserType)},
       dateCreated: {type: GraphQLString},
       admin: {type: GraphQLString}
   }
})