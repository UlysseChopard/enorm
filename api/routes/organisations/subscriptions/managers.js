const {
  add,
  remove,
} = require("controllers/organisations/subscriptions/managers");
const { hasRole } = require("middlewares");

module.exports = (express) => {
  const router = express.Router({ mergeParams: true });
  router.put("/", hasRole("admin", "manager"), add);
  router.delete("/:manager", hasRole("admin", "manager"), remove);
  return router;
};
