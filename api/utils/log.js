const { createLogger, stdSerializers: serializers } = require("bunyan");

module.exports = createLogger({ name: "Jadoube API", serializers });
