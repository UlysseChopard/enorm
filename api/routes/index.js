const sessions = require("./sessions");
const accounts = require("./accounts");
const organisations = require("./organisations");

module.exports = (express) => {
  const router = express.Router();
  router.use("/api/sessions", sessions(express));
  router.use("/api/accounts", accounts(express));
  router.use("/api/organisations/:organisation", organisations(express));
  return router;
};
