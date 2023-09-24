const { get, create, update, remove } = require("controllers/accounts");

const isAccountOwner = (req, res, next) =>
  req.params.id === res.locals.accountId
    ? next()
    : res
        .status(403)
        .json({ message: "Only account owner can modify its account" });

module.exports = ({ Router }) => {
  const router = Router();
  router.post("/", create);
  router.get("/:id", isAccountOwner, get);
  router.patch("/:id", isAccountOwner, update);
  router.delete("/:id", isAccountOwner, remove);
  return router;
};
