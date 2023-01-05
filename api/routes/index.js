const sessions = require("./sessions");
const accounts = require("./accounts");

module.exports = (express, app) => {
  const router = express.Router();

  app.use("/api/sessions", sessions(router));
  app.use("/api/accounts", accounts(router));
};
