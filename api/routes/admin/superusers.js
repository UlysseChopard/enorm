const { get, create, remove } = require("controllers/admin/superusers");

module.exports = ({ Router }) => {
  const router = Router();
  router.get("/", get);
  router.post("/", create);
  router.delete("/:id", remove);
  return router;
};
