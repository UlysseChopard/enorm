const {
  get,
  create,
  close,
  replace,
  addUser,
  removeUser,
} = require("controllers/organisations/establishments");

module.exports = ({ Router }) => {
  const router = Router();
  router.post("/", create);
  router.get("/", get);
  router.put("/:id", replace);
  router.delete("/:id", close);
  router.put("/:id/users/:userId", addUser);
  router.delete("/:id/users/:userId", removeUser);
  return router;
};
