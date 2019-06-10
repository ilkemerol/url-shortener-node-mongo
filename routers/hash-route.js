const express = require("express");
const router = express.Router();
const path = require("path");

const shortenerController = require("../controllers/shortener-controller");

router.get("/:hash", shortenerController.getOriginal);

module.exports = router;
