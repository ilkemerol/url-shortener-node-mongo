const express = require("express");

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
    // return res.status(200).json({
    //   error: "no shorten url"
    // });
    res.writeHead(302, {
      Location: "/shortener"
    });
    res.end();
  }
};

exports.initCounter = async function(req, res, next) {
  var serviceResponse = await shortenerService.initiateCounter(req);
  return res.status(200).json({
    serviceResponse
  });
};
