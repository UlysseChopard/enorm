const { add } = require("controllers/organisations/subscriptions/managers");
const { hasRole } = require("middlewares/roles");

module.exports = (express) => {
  const router = express.Router({ mergeParams: true });
  router.put("/:manager", hasRole("admin", "manager"), add);
  return router;
};
