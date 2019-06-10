const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/url-shortener", {
  useNewUrlParser: true
});

const shortenerRoute = require("./routers/shortener-route");
const hashRoute = require("./routers/hash-route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use("/shortener", shortenerRoute);
app.use("/", hashRoute);

module.exports = app;
