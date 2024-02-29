const { createWriteStream } = require("node:fs");
const { createLogger, stdSerializers: serializers } = require("bunyan");

module.exports = createLogger({
  name: "Jadoube API",
  stream:
    process.env.NODE_ENV !== "test"
      ? process.stdout
      : createWriteStream("/dev/null"),
  serializers,
});
