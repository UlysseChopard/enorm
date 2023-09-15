const {
  get,
  invite,
  establish,
  close,
} = require("controllers/organisations/subscriptions");

module.exports = ({ Router }) => {
  const router = Router();
  router.get("/", get);
  router.put("/", invite);
  router.post("/:subscription", establish);
  router.delete("/:subscription", close);
  return router;
};
