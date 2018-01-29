const{
    GraphQLObjectType,
    GraphQLString
} = require("graphql");

const UserType = require("./user-type");
const UserModel = require("../../mongoose/models/user");

module.exports = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        user:{
            type: UserType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentVal,args){
            return UserModel.findById(args.id).then((doc)=>{
                if(doc){
                    return doc;
                }else{
                    throw "No such user";
                }
            })
        }
        }
    }
}) 