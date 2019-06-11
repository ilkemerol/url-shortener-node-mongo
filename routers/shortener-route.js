const express = require("express");
const router = express.Router();
const path = require("path");

const shortenerController = require("../controllers/shortener-controller");

router.get("/", (req, res, next) => {
  res.sendFile(path.resolve("views/index.html"));
});

router.get("/test-view", (req, res, next) => {
  res.sendFile(path.resolve("views/test.html"));
});

// router.use("/service", shortenerController);

router.post("/service/insert-mongo", shortenerController.insertOrCheck);
router.get("/service/init-counter", shortenerController.initCounter);

module.exports = router;
