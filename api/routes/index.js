const admin = require("./admin");
const sessions = require("./sessions");
const accounts = require("./accounts");
const organisations = require("./organisations");

const { isSuperuser } = require("middlewares/roles");

module.exports = (express, app) => {
  app.use("/api/admin", isSuperuser, admin(express));
  app.use("/api/sessions", sessions(express));
  app.use("/api/accounts", accounts(express));
  app.use("/api/organisations/:organisation", organisations(express));
  return app;
};
