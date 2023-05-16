const {
  request,
  accept,
  deny,
  get,
  find,
} = require("../controllers/registrations");

module.exports = (router) => {
  router.get("/", get);
  router.post("/", request);
  router.put("/:id", accept);
  router.delete("/:id", deny);
  router.get("/:id", find);
  return router;
};
