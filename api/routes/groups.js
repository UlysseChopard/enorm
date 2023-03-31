const {
  get,
  create,
  setRegistrationsOpenness,
  setVisibility,
} = require("../controllers/groups");

module.exports = (router) => {
  router.get("/", get);
  router.post("/", create);
  router.put("/:id/registrations/:status", setRegistrationsOpenness);
  router.put("/:id/visibility/:status", setVisibility);
  return router;
};
