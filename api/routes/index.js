const sessions = require("./sessions");
const wgs = require("./wgs");
const paths = require("./paths");
const networks = require("./networks");
const subscriptions = require("./subscriptions");
const accounts = require("./accounts");
const passwords = require("./passwords");

module.exports = (express, app) => {
  const router = express.Router();

  app.use("/api/sessions", sessions(router));
  app.use("/api/wgs", wgs(router));
  app.use("/api/paths", paths(router));
  app.use("/api/networks", networks(router));
  app.use("/api/subscriptions", subscriptions(router));
  app.use("/api/accounts", accounts(router));
  app.use("/api/passwords", passwords(router));
};
