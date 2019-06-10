const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  _id: { type: Number },
  url: { type: String },
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("url", urlSchema);
