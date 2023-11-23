const {
  get,
  find,
  invite,
  establish,
  close,
} = require("controllers/organisations/subscriptions");
const { hasRole } = require("middlewares/roles");
const managers = require("./managers");

module.exports = (express) => {
  const router = express.Router({ mergeParams: true });
  router.get("/", hasRole("admin", "manager"), get);
  router.get("/:subscription", hasRole("admin", "manager"), find);
  router.put("/", hasRole("admin", "manager"), invite);
  router.post("/:subscription", hasRole("admin", "manager"), establish);
  router.delete("/:subscription", hasRole("admin", "manager"), close);
  router.use("/:subscription/managers", managers(express));
  return router;
};
