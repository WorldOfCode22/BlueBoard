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
        console.log(user);
        res.send({ message: `Welcome. You are ${user.username}.` });
      });
    },
  );
};

userController.doLogin = function (req, res) {
  passport.authenticate('local')(req, res, () => {
    res.send({ message: `Logged in as ${req.user.username}!` });
  });
};

userController.logout = function (req, res) {
  req.logout();
  console.log(req.user);
  return res.send({ message: 'Logged out' });
};

module.exports = userController;
