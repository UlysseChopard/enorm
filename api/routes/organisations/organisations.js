const {
  get,
  replace,
  close,
} = require("controllers/organisations/organisations");

module.exports = ({ Router }) => {
  const router = Router();
  router.get("/", get);
  router.put("/:id", replace);
  router.delete("/:id", close);
  return router;
};
