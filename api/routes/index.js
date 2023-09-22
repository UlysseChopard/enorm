const admin = require("./admin");
const tokens = require("./tokens");
const sessions = require("./sessions");
const accounts = require("./accounts");
const organisations = require("./organisations");

module.exports = (express, app) => {
  app.use("/api/admin", admin(express));
  app.use("/api/tokens", tokens(express));
  app.use("/api/sessions", sessions(express));
  app.use("/api/accounts", accounts(express));
  app.use("/api/organisations/:organisation", organisations(express));
  return app;
};
