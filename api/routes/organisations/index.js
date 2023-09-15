const establishments = require("./establishments");
const users = require("./users");
const workingGroups = require("./working-groups");
const subscriptions = require("./subscriptions");
const registrations = require("./registrations");
const organisations = require("./organisations");

module.exports = (express) => {
  const router = express.Router();
  router.use("/", organisations(express));
  router.use("/establishments", establishments(express));
  router.use("/users", users(express));
  router.use("/working-groups", workingGroups(express));
  router.use("/subscriptions", subscriptions(express));
  router.use("/registrations", registrations(express));
  return router;
};
