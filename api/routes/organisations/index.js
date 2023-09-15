const establishments = require("./establishments");
const members = require("./members");
const workingGroups = require("./working-groups");
const subscriptions = require("./subscriptions");
const registrations = require("./registrations");
const organisations = require("./organisations");

module.exports = (express) => {
  const router = express.Router();
  router.use("/", organisations(express));
  router.use("/establishments", establishments(express));
  router.use("/members", members(express));
  router.use("/working-groups", workingGroups(express));
  router.use("/subscriptions", subscriptions(express));
  router.use("/registrations", registrations(express));
  return router;
};
