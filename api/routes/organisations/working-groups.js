const {
  get,
  create,
  find,
  remove,
} = require("controllers/organisations/working-groups");

module.exports = ({ Router }) => {
  const router = Router();
  router.get("/", get);
  router.get("/:id", find);
  router.delete("/:id", remove);
  router.post("/", create);
  return router;
};
