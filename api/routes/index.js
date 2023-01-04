const sessions = require("./sessions");
const accounts = require("./accounts");
const passwords = require("./passwords");

module.exports = (express, app) => {
  const router = express.Router();

  app.use("/api/sessions", sessions(router));
  app.use("/api/accounts", accounts(router));
  app.use("/api/passwords", passwords(router));
};
