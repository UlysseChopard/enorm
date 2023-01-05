const { createLogger, stdSerializers: serializers } = require("bunyan");

module.exports = createLogger({ name: "stancity API", serializers });
