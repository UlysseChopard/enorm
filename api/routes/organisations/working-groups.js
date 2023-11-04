const {
  get,
  create,
  find,
  remove,
} = require("controllers/organisations/working-groups");
const { hasRole } = require("middlewares/roles");

module.exports = ({ Router }) => {
  const router = Router({ mergeParams: true });
  router.get("/", hasRole("admin", "manager", "expert"), get);
  router.get("/:wg", hasRole("admin", "manager", "expert"), find);
  router.delete("/:wg", hasRole("admin", "manager"), remove);
  router.post("/", hasRole("admin", "manager"), create);
  return router;
};
