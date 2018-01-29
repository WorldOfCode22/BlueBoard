const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require("graphql");

const UserType = require("./user-type");
const ClassType = require("./class-type");
const UserModel = require("../../mongoose/models/user");
const ClassModel = require("../../mongoose/models/class");

module.exports = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        user:{
            type: UserType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)}
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
        },
     class:{
         type: ClassType,
         args:{
             id:{type: new GraphQLNonNull(GraphQLString)}
         },
        resolve(parentVal,args){
            return ClassModel.findById(args.id).then((doc)=>{
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