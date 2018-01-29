const{
    GraphQLObjectType,
    GraphQLString
} = require("graphql");

const UserType = require("./user-type");
module.exports = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        user:{
            type: UserType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentVal,args){
            
        }
        }
    }
}) 