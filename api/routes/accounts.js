const { get, create, update, remove, upsert } = require("controllers/accounts");

const isAccountOwner = (req, res, next) =>
  req.params.id === res.locals.accountId
    ? next()
    : res
        .status(403)
        .json({ message: "Only account owner can modify its account" });

module.exports = ({ Router }) => {
  const router = Router();
  // a supprimer
  router.post("/", create);
  router.put("/", upsert);
  router.get("/:id", isAccountOwner, get);
  router.patch("/:id", isAccountOwner, update);
  router.delete("/:id", isAccountOwner, remove);
  return router;
};
