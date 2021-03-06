const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var favicon = require("serve-favicon");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
});

const shortenerRoute = require("./routers/shortener-route");
const hashRoute = require("./routers/hash-route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(favicon(__dirname + "/styles/url.ico"));

app.use("/shortener", shortenerRoute);
app.use("/", hashRoute);

module.exports = app;
