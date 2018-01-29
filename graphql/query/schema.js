const{
    GraphQLSchema
} = require("graphql")
const root = require("./root");
const mutation = require("../mutation");

module.exports = new GraphQLSchema({
   query:root,
   mutation:mutation
});