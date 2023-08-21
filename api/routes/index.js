const sessions = require("./sessions");
const accounts = require("./accounts");
const workingGroups = require("./working-groups");
const subscriptions = require("./subscriptions");
const registrations = require("./registrations");
const administration = require("./administration");
const organisation = require("./organisations");

module.exports = (express, app) => {
  const router = express.Router;
  app.use("/api/sessions", sessions(router()));
  app.use("/api/accounts", accounts(router()));
  app.use("/api/organisations", organisation(router()));

  app.use(
    "/api/organisations/:organisation/working-groups",
    workingGroups(router())
  );
  app.use(
    "/api/organisations/:organisation/subscriptions",
    subscriptions(router())
  );
  app.use(
    "/api/organisations/:organisation/registrations",
    registrations(router())
  );
  app.use(
    "/api/organisations/:organisation/administration",
    administration(router)
  );
};
