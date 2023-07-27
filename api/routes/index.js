const sessions = require("./sessions");
const accounts = require("./accounts");
const workingGroups = require("./working-groups");
const subscriptions = require("./subscriptions");
const registrations = require("./registrations");
const administration = require("./administration");

module.exports = (express, app) => {
  const router = express.Router;
  app.use("/api/sessions", sessions(router()));
  app.use("/api/accounts", accounts(router()));
  app.use("/api/working-groups", workingGroups(router()));
  app.use("/api/subscriptions", subscriptions(router()));
  app.use("/api/registrations", registrations(router()));
  app.use("/api/administration", administration(router));
};
