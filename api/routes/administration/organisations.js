const {
  get,
  replace,
} = require("../../controllers/administration/organisations");

module.exports = (router) => {
  router.get("/", get);
  router.put("/:id", replace);
  return router;
};
