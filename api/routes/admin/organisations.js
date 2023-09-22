const { create, get, remove } = require("controllers/admin/organisations");

module.exports = ({ Router }) => {
  const router = Router();
  router.get("/", get);
  router.post("/", create);
  router.delete("/", remove);
  return router;
};
