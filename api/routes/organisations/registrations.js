const {
  request,
  accept,
  deny,
  get,
  find,
} = require("controllers//organisations/registrations");

module.exports = ({ Router }) => {
  const router = Router();
  router.get("/", get);
  router.post("/", request);
  router.patch("/:id", accept);
  router.delete("/:id", deny);
  router.get("/:id", find);
  return router;
};
