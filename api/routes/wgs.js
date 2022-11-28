const {
  get,
  create,
  update,
  remove,
  addMembers,
  removeMembers,
  addAdmins,
  removeAdmins,
} = require("../middlewares/wgs");

module.exports = (router) => {
  router.get("/", get);
  router.delete("/:id/members", removeMembers);
  router.put("/:id/members", addMembers);
  router.delete("/:id/admins", removeAdmins);
  router.put("/:id/admins", addAdmins);
  router.post("/", create);
  router.patch("/:id", update);
  router.delete("/:id", remove);
};
