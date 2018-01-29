const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const student = new Schema({
   username: String,
   classes: Array
});

module.exports = mongoose.model("student",student);