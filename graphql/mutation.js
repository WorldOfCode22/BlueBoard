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
                firstname:{type: GraphQLString},
                lastname: {type: GraphQLString},
                role:{type: GraphQLString},
                organization:{type: GraphQLString},
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
            },
          editUser:{
              type:UserType,
              args:{
                  id:{type: new GraphQLNonNull(GraphQLString)},
                  username:{type: GraphQLString},
                  password:{type: GraphQLString},
                  firstname:{type: GraphQLString},
                  lastname:{type: GraphQLString},
                  role:{type: GraphQLString}
              },
              resolve(parentVal,args){
                  let argsKeys = Object.keys(args);
                  return UserModel.findById(args.id).then((doc)=>{
                     if(doc){
                         let docKeys = Object.keys(doc._doc);
                         console.log(argsKeys);
                         console.log(docKeys);
                         for(i = 0; i<argsKeys.length;i++){
                             var index = docKeys.indexOf(argsKeys[i]);
                             console.log(index);
                             if(index === -1){
                                 var newDocKey = argsKeys[i];
                                 var argsChangeKey = argsKeys[i];
                                 doc[newDocKey] = args[argsChangeKey];
                             }else{
                                 var docChangeKey = docKeys[index];
                                 var argsChangeKey = argsKeys[i];
                                 doc[docChangeKey] = args[argsChangeKey];
                             }
                         }
                         return doc.save().then((doc)=>{
                             return doc;
                         })
                     }else{
                         throw "No Such User"
                     }
                  })
              }
          }
        }
    })
