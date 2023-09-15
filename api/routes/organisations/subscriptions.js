const {
  get,
  invite,
  establish,
  close,
} = require("controllers/organisations/subscriptions");
const { hasRole } = require("middlewares/roles");

module.exports = ({ Router }) => {
  const router = Router();
  router.get("/", hasRole("admin", "manager"), get);
  router.put("/", hasRole("admin", "manager"), invite);
  router.post("/:subscription", hasRole("admin", "manager"), establish);
  router.delete("/:subscription", hasRole("admin", "manager"), close);
  return router;
};
