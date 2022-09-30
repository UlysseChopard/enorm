const app = require("./app");
const log = require("./utils/logs");

const normalizePort = (val) => {
  const normalizedPort = parseInt(val, 10);

  if (isNaN(normalizedPort)) {
    return val;
  }
  if (normalizedPort >= 0) {
    return normalizedPort;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000");

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      log.error(bind + " requires elevated privileges.");
      process.exit(1);
    case "EADDRINUSE":
      log.error(bind + " is already in use.");
      process.exit(1);
    default:
      throw error;
  }
};

app.listen(port, (err) => {
  if (err) return errorHandler(err);
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log(`Listening on ${bind}`);
});
