const {
  request,
  accept,
  deny,
  get,
  find,
} = require("controllers/organisations/registrations");
const { hasRole } = require("middlewares/roles");

module.exports = ({ Router }) => {
  const router = Router({ mergeParams: true });
  router.get("/", hasRole("admin", "manager"), get);
  router.post("/", hasRole("admin", "manager"), request);
  router.patch("/:id", hasRole("admin", "manager"), accept);
  router.delete("/:id", hasRole("admin", "manager"), deny);
  router.get("/:id", hasRole("admin", "manager"), find);
  return router;
};
