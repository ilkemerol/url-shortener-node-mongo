const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  _id: Number,
  url: String,
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("url", urlSchema);
