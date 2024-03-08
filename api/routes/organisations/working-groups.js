const {
  create,
  find,
  get,
  remove,
  update,
} = require("controllers/organisations/working-groups");
const { hasRole } = require("middlewares");

module.exports = ({ Router }) => {
  const router = Router({ mergeParams: true });
  router.get("/", hasRole("admin", "manager", "expert"), get);
  router.get("/:wg", hasRole("admin", "manager", "expert"), find);
  router.delete("/:wg", hasRole("admin", "manager"), remove);
  router.post("/", hasRole("admin", "manager"), create);
  router.put("/:wg", hasRole("admin", "manager"), update);
  return router;
};
