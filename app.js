const express = require("express");
const port = 3000;
const keys = require("./config/keys");
const mongoose = require("mongoose");
mongoose.connect(keys.database.URI).then(()=>{
    console.log("Database Connected");
},
err =>{console.log("Datbase connection error: " + err)});
var app = express();

app.listen(port,()=>{
    console.log("App runing on port " + port);
})