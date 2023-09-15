const {
  get,
  create,
  close,
  replace,
  addUser,
  removeUser,
} = require("controllers/organisations/establishments");
const { hasRole } = require("middlewares/roles");

module.exports = ({ Router }) => {
  const router = Router();
  router.post("/", hasRole("admin"), create);
  router.delete("/:id", hasRole("admin"), close);
  router.get("/", hasRole("admin", "manager"), get);
  router.put("/:id", hasRole("admin", "manager"), replace);
  router.put("/:id/users/:userId", hasRole("admin", "manager"), addUser);
  router.delete("/:id/users/:userId", hasRole("admin", "manager"), removeUser);
  return router;
};
