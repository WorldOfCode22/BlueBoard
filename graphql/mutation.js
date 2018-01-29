const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require("graphql");
const UserType = require("./query/user-type");
const UserModel = require("../mongoose/models/user");

module.exports = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addUser:{
            type:UserType,
            args:{
                username:{type: new GraphQLNonNull(GraphQLString)},
                password:{type: new GraphQLNonNull(GraphQLString)},
                organization:{type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentVal,args){
                return UserModel.findOne({username:args.username}).then((doc)=>{
                    if(doc){
                        throw "Username Taken";
                    }else{
                        return new UserModel({
                            username:args.username,
                            password:args.password,
                            organization:args.organization
                        }).save().then((doc)=>{
                            if(doc){
                                return doc;
                            }else{
                                throw "Error creating user despite unique username"
                            }
                        })
                    }
                })
            },
        },
            deleteUser:{
                type:UserType,
                args:{
                    id:{type: new GraphQLNonNull(GraphQLString)},
                    password:{type: new GraphQLNonNull(GraphQLString)}
                },
                resolve(parentVal,args){
                    return UserModel.remove({_id:args.id,password:args.password}).then((doc)=>{
                        if(!doc){
                            throw "User Not Removed " + err;
                        }else{
                            throw "User Removed"
                        }
                    })
                }
            }
        }
    })
