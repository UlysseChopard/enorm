const admin = require("./admin");
const sessions = require("./sessions");
const accounts = require("./accounts");
const organisations = require("./organisations");

const { isAuthenticated, isSuperuser } = require("middlewares");

module.exports = (express, app) => {
  app.use("/api/admin", isAuthenticated, isSuperuser, admin(express));
  app.use("/api/sessions", isAuthenticated, sessions(express));
  app.use("/api/accounts", isAuthenticated, accounts(express));
  app.use(
    "/api/organisations/:organisation",
    isAuthenticated,
    organisations(express),
  );
  return app;
};
