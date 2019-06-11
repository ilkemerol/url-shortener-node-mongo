const SimpleNodeLogger = require("simple-node-logger"),
  opts = {
    logFilePath: "shortener.log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS"
  },
  log = SimpleNodeLogger.createSimpleLogger(opts);

exports.doit = function(object) {
  log.info("=== ECOMX LOG BEGIN ===");
  log.info(object);
  log.info("=== ECOMX LOG END===");
};
