const mongoose = require("mongoose");
const urlModel = require("../models/shortener-model");
const counterModel = require("../models/counter-model");

exports.insertUrl = async function(req) {
  const isExist = await urlModel.findOne({ url: req.body.url });
  if (isExist) {
    const hashedVal = Buffer.from(isExist._id.toString()).toString("base64");
    return hashedVal;
  } else {
    const currCounter = await counterModel.findOneAndUpdate(
      { _id: "url_count" },
      { $inc: { count: 1 } },
      { new: true, useFindAndModify: false }
    );
    const newUrl = new urlModel({
      _id: currCounter.count,
      url: req.body.url,
      created_date: new Date()
    });
    const addedUrl = await newUrl.save();
    return Buffer.from(addedUrl._id.toString()).toString("base64");
  }
};

exports.hashToOriginal = async function(req) {
  const json = await urlModel.findOne({
    _id: Buffer.from(req.params.hash, "base64").toString()
  });
  return json;
};

exports.initiateCounter = async function(req) {
  const initCounter = new counterModel({ _id: "url_count", count: 10000 });
  const json = await initCounter.save();
  return json;
};
