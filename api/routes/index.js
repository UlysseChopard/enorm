const sessions = require("./sessions");
const accounts = require("./accounts");
const groups = require("./groups");
const subscriptions = require("./subscriptions");

module.exports = (express, app) => {
  const router = express.Router;

  app.use("/api/sessions", sessions(router()));
  app.use("/api/accounts", accounts(router()));
  app.use("/api/groups", groups(router()));
  app.use("/api/subscriptions", subscriptions(router()));
};
