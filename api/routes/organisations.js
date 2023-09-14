const { get, replace, close } = require("../controllers/organisations");

module.exports = (router) => {
  router.get("/", get);
  router.put("/:id", replace);
  router.delete("/:id", close);
  return router;
};
