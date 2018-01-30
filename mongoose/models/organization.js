const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organization = new Schema({
   name: String,
   classes: Array,
   teachers: Array,
   students: Array,
   dateCreated: String,
   admin: String
});

module.exports = mongoose.model("organization", organization);