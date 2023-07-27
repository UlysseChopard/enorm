const {
  get,
  create,
  close,
  replace,
} = require("../../controllers/administration/establishments");

module.exports = (router) => {
  router.post("/", create);
  router.get("/", get);
  router.put("/:id", replace);
  router.delete("/:id", close);
  return router;
};
