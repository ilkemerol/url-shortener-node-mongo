const mongoose = require("mongoose");
const requestIp = require("request-ip");
const log = require("../utils/shortener-logger");
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
      log.doit(
        requestIp.getClientIp(req) +
          " get exist Url with _id: " +
          isExist._id +
          " Url: " +
          isExist.url
      );
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
        creator: requestIp.getClientIp(req).toString(),
        created_date: new Date()
      });
      log.doit(
        requestIp.getClientIp(req) +
          " insert a new Url with _id: " +
          newUrl._id +
          " Url: " +
          newUrl.url
      );
      const addedUrl = await newUrl.save();
      return Buffer.from(addedUrl._id.toString()).toString("base64");
    }
  } else {
    log.doit(requestIp.getClientIp(req) + " try to something.");
    const errJson = {
      errCode: 999
    };
    return errJson;
  }
};

exports.hashToOriginal = async function(req) {
  if (!isNaN(Buffer.from(req.params.hash, "base64").toString())) {
    const json = await urlModel.findOne({
      _id: parseInt(Buffer.from(req.params.hash, "base64").toString())
    });
    await urlModel.findOneAndUpdate(
      { _id: json.id },
      { $inc: { usage: 1 } },
      { new: true, useFindAndModify: false }
    );
    log.doit(
      requestIp.getClientIp(req) +
        " using shorten Url with hash: " +
        req.params.hash +
        " , _id: " +
        json.id +
        " , origin: " +
        json.url
    );
    return json;
  }
};

exports.initiateCounter = async function(req) {
  log.doit(requestIp.getClientIp(req) + " try to init counter schema.");
  const initCounter = new counterModel({ _id: "url_count", count: 10000 });
  const json = await initCounter.save();
  return json;
};
