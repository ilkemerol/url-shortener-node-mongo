const express = require("express");
const router = express.Router();

const shortenerService = require("../services/shortener-service");

exports.insertOrCheck = async function(req, res, next) {
  var serviceResponse = await shortenerService.insertUrl(req);
  return res.status(200).json({
    serviceResponse
  });
};

exports.getOriginal = async function(req, res, next) {
  var serviceResponse = await shortenerService.hashToOriginal(req);
  if (serviceResponse) {
    res.writeHead(302, {
      Location: serviceResponse.url.toString()
    });
    res.end();
  } else {
    return res.status(200).json({
      error: "no shorten url"
    });
  }
};

exports.initCounter = async function(req, res, next) {
  var serviceResponse = await shortenerService.initiateCounter(req);
  return res.status(200).json({
    serviceResponse
  });
};
