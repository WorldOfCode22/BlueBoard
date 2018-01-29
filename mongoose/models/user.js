const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    role: String,
    organization: String,
    classes: Array
})

module.exports = mongoose.model("user",user);