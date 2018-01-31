/* eslint-disable no-console, no-underscore-dangle, no-plusplus, no-param-reassign, no-shadow */

const {
  GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList,
} = require('graphql');

const UserType = require('./query/user-type');
const ClassType = require('./query/class-type');
const AssignmentsType = require('./query/assignments-type').InputType;
const OrganizationType = require('./query/organization-type');
const UserModel = require('../mongoose/models/user');
const ClassModel = require('../mongoose/models/class');
const OrganizationModel = require('../mongoose/models/organization');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentVal, args) {
        return UserModel.remove({ _id: args.id, password: args.password }).then((doc) => {
          if (!doc) {
            throw new Error('User Not Removed.');
          } else {
            throw new Error('User Removed');
          }
        });
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        role: { type: GraphQLString },
      },
      resolve(parentVal, args) {
        return UserModel.findById(args.id).then((doc) => {
          if (doc) {
            doc = Object.assign(doc, args);
            return doc.save().then(doc => doc);
          }
          throw new Error('No Such User');
        });
      },
    },
  },
  editClass: {
    type: ClassType,
    args: {
      id: { type: GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      section: { type: GraphQLString },
      admin: { type: GraphQLString },
      teacher: { type: GraphQLString },
      assignments: { type: GraphQLList(AssignmentsType) },
      students: { type: GraphQLList(UserType.InputType) },
    },
    resolve(parentVal, args) {
      const argsKeys = Object.keys(args);
      return ClassModel.findById(args.id).then((doc) => {
        if (doc) {
          const docKeys = Object.keys(doc._doc);
          console.log(argsKeys);
          console.log(docKeys);
          for (let i = 0; i < argsKeys.length; i++) {
            const index = docKeys.indexOf(argsKeys[i]);
            console.log(index);
            if (index === -1) {
              const newDocKey = argsKeys[i];
              const argsChangeKey = argsKeys[i];
              doc[newDocKey] = args[argsChangeKey];
            } else {
              const docChangeKey = docKeys[index];
              const argsChangeKey = argsKeys[i];
              doc[docChangeKey] = args[argsChangeKey];
            }
          }
          return doc.save().then(doc => doc);
        }
        throw new Error('No Such User');
      });
    },
  },
  addOrganization: {
    type: OrganizationType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      admin: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve(parentVal, args) {
      return UserModel.findById(args.admin).then((doc) => {
        if (doc) {
          return new OrganizationModel({
            name: args.name,
            admin: args.admin,
            dateCreated: parseInt(Date.now(), 10),
          })
            .save()
            .then((doc) => {
              if (doc) {
                return doc;
              }
              throw new Error('Error While Trying To Save Organization');
            });
        }
        throw new Error('No Such User');
      });
    },
  },
  removeOrganization: {
    type: OrganizationType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parentVal, args) {
      return OrganizationModel.remove({ _id: args.id }).then((doc) => {
        if (doc) {
          throw new Error('Organization Removed');
        } else {
          throw new Error('Error Removing Organization');
        }
      });
    },
  },
  editOrganization: {
    type: OrganizationType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      classes: { type: GraphQLList(ClassType.InputType) },
      teachers: { type: GraphQLList(UserType.InputType) },
      students: { type: GraphQLList(UserType.InputType) },
      admin: { type: GraphQLString },
    },
    resolve(parentVal, args) {
      const argsKeys = Object.keys(args);
      return OrganizationModel.findById(args.id).then((doc) => {
        if (doc) {
          const docKeys = Object.keys(doc._doc);
          for (let i = 0; i < argsKeys.length; i++) {
            const index = docKeys.indexOf(argsKeys[i]);
            console.log(index);
            if (index === -1) {
              const newDocKey = argsKeys[i];
              const argsChangeKey = argsKeys[i];
              doc[newDocKey] = args[argsChangeKey];
            } else {
              const docChangeKey = docKeys[index];
              const argsChangeKey = argsKeys[i];
              doc[docChangeKey] = args[argsChangeKey];
            }
          }
          return doc.save().then(doc => doc);
        }
        throw new Error('No Such User');
      });
    },
  },
});
