const sessions = require("./sessions");
const accounts = require("./accounts");
const registrations = require("./registrations");
const groups = require("./groups");
const companies = require("./companies");
const subscriptions = require("./subscriptions");
const teams = require("./teams");
const organisations = require("./organisations");

module.exports = (express, app) => {
  const router = express.Router;

  app.use("/api/sessions", sessions(router()));
  app.use("/api/accounts", accounts(router()));
  app.use("/api/registrations", registrations(router()));
  app.use("/api/groups", groups(router()));
  app.use("/api/companies", companies(router()));
  app.use("/api/subscriptions", subscriptions(router()));
  app.use("/api/teams", teams(router()));
  app.use("/api/organisations", organisations(router()));
};
