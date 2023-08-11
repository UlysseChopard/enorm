const {
  get,
  create,
  close,
  replace,
  addUser,
  removeUser,
} = require("../../controllers/administration/establishments");

module.exports = (router) => {
  router.post("/", create);
  router.get("/", get);
  router.put("/:id", replace);
  router.delete("/:id", close);
  router.put("/:id/users/:userId", addUser);
  router.delete("/:id/users/:userId", removeUser);
  return router;
};
