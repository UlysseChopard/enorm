const { check } = require("controllers/tokens");

module.exports = ({ Router }) => {
  const router = Router();
  router.get("/:id", check);
  return router;
};
