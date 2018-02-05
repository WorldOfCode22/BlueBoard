/* eslint-disable func-names */

const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../mongoose/models/user');

const userController = {};

userController.doRegister = function (req, res) {
  const {
    username, password, firstName, lastName, organization,
  } = req.body;
  const role = 'Admin';
  User.register(
    new User({
      username,
      firstName,
      lastName,
      organization,
      role,
    }),
    password,
    (err, user) => {
      if (err) {
        return res.send({ message: `AuthController Error: ${err}` });
      }
      return passport.authenticate('local')(req, res, () => {
        res.send({ message: `Welcome. You are ${user.username}.`});
      });
    },
  );
};

userController.doLogin = function (req, res) {
  passport.authenticate('local')(req, res, () => {
    res.send({ message: `Logged in as ${req.user.username}!` });
  });
};

userController.getUser = function (req, res){
    if(req.isAuthenticated()){
        res.json({user:req.user});
    }else{
        res.send("Not Logged In");
    }      
}
userController.logout = function (req, res) {
  req.logout();
  return res.send({ message: 'Logged out' });
};

module.exports = userController;
