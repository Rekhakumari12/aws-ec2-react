
   
const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config()
console.log("__dirname - ", __dirname)
app.use(express.static(path.join(__dirname, "build")));

app.post("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3000);