const express = require("express");
const port = 3000;
const keys = require("./config/keys");
const mongoose = require("mongoose");
const graphQLExpress = require("express-graphql");
const Schema = require("./graphql/query/schema");
const mutation = require("./graphql/mutation");

mongoose.connect(keys.database.URI).then(()=>{
    console.log("Database Connected");
},
err =>{console.log("Datbase connection error: " + err)});
var app = express();

app.use("/graph",graphQLExpress({
    graphiql: true,
    schema:Schema,
    mutation:mutation
}));

app.listen(port,()=>{
    console.log("App runing on port " + port);
})