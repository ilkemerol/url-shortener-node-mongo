const mongoose = require("mongoose");
const urlModel = require("../models/shortener-model");
const counterModel = require("../models/counter-model");

exports.insertUrl = async function(req) {
  if (
    /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
      req.body.url
    )
  ) {
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
  } else {
    const errJson = {
      errCode: 999
    };
    return errJson;
  }
};

exports.hashToOriginal = async function(req) {
  if (parseInt(Buffer.from(req.params.hash, "base64").toString()) !== NaN) {
    const json = await urlModel.findOne({
      _id: parseInt(Buffer.from(req.params.hash, "base64").toString())
    });
    return json;
  }
};

exports.initiateCounter = async function(req) {
  const initCounter = new counterModel({ _id: "url_count", count: 10000 });
  const json = await initCounter.save();
  return json;
};
