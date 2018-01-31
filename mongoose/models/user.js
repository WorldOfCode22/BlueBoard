const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const user = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  role: String,
  organization: String,
  classes: Array,
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', user);
