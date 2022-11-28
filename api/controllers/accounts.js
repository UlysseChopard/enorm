const {
  create,
  get,
  replace,
  changePassword,
  remove,
} = require("../controllers/accounts");

module.exports = (router) => {
  router.post("/", create);
  router.get("/:id", get);
  router.put("/:id", replace);
  router.patch("/:id/password", changePassword);
  router.delete("/:id", remove);
};
