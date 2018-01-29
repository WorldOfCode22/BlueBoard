const express = require("express");
const port = 3000;
var app = express();

app.listen(port,()=>{
    console.log("App runing on port " + port);
})