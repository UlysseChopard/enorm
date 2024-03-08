const { get, replace, close } = require("controllers/organisations");
const { hasRole } = require("middlewares");
const establishments = require("./establishments");
const members = require("./members");
const workingGroups = require("./working-groups");
const subscriptions = require("./subscriptions");
const registrations = require("./registrations");

module.exports = (express) => {
  const router = express.Router({ mergeParams: true });
  router.get("/", hasRole("admin"), get);
  router.put("/", hasRole("admin"), replace);
  router.delete("/", hasRole("admin"), close);
  router.use("/establishments", establishments(express));
  router.use("/members", members(express));
  router.use("/working-groups", workingGroups(express));
  router.use("/subscriptions", subscriptions(express));
  router.use("/registrations", registrations(express));
  return router;
};
