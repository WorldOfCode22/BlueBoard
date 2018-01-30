const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require("graphql");

const UserType = require("./query/user-type");
const ClassType = require("./query/class-type");
const AssignmentsType = require("./query/assignments-type").InputType;
const OrganizationType = require("./query/organization-type");
const UserModel = require("../mongoose/models/user");
const ClassModel = require("../mongoose/models/class");
const OrganizationModel = require("../mongoose/models/organization");

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
          },
        addClass:{
            type: ClassType,
            args:{
                name: {type: GraphQLNonNull(GraphQLString)},
                section: {type: GraphQLString},
                admin: {type: GraphQLNonNull(GraphQLString)},
                teacher: {type: GraphQLString}
            },
            resolve(parentVal,args){
                return new ClassModel({
                    name: args.name,
                    section: args.section,
                    admin: args.admin,
                    teacher: args.teacher
                }).save().then((doc)=>{
                    return doc;
                })
            }
        },
        removeClass:{
            type: ClassType,
            args:{
                id:{type: GraphQLString}
            },
            resolve(parentVal,args){
                return ClassModel.remove({_id:args.id}).then((doc)=>{
                    if(doc){
                        throw "User Deleted";
                    }else{
                        throw "No Such User";
                    }
                })
            }
        },
        editClass:{
        type: ClassType,
            args:{
                id:{type: GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                section: {type: GraphQLString},
                admin: {type: GraphQLString},
                teacher: {type: GraphQLString},
                assignments: {type:GraphQLList(AssignmentsType)},
                students: {type:GraphQLList(UserType.InputType)}
            },
            resolve(parentVal,args){
                return ClassModel.findById(args.id).then((doc)=>{
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
    },
        addOrganization:{
            type:OrganizationType,
            args:{
                name: {type: GraphQLNonNull(GraphQLString)},
                admin: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parentVal,args){
                return UserModel.findById(args.admin).then((doc)=>{
                    if(doc){
                        return new OrganizationModel({
                            name: args.name,
                            admin: args.admin,
                            dateCreated: parseInt(Date.now())
                        }).save().then((doc)=>{
                            if(doc){
                                return doc;
                            }else{
                                throw "Error While Trying To Save Organization"
                            }
                        }) 
                    }else{
                        throw "No Such User";
                    }
                })
            }
        }
        }
    })
