const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  _id: { type: Number },
  url: { type: String },
  creator: { type: String },
  usage: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("url", urlSchema);
