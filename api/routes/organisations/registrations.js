const { SubscriptionsManagers } = require("models");
const {
  create,
  accept,
  deny,
  get,
  find,
} = require("controllers/organisations/registrations");
const { hasRole } = require("middlewares/roles");
const isSubscriptionManager = async (req, res, next) => {
  try {
    const {
      rows: [subscriptionManager],
    } = await SubscriptionsManagers.findByWGPath(req.body.wgPath);
    if (res.locals.accountId !== subscriptionManager.account) {
      return res
        .status(403)
        .json({ message: "Only allowed to subscription managers" });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = ({ Router }) => {
  const router = Router({ mergeParams: true });
  router.get("/", hasRole("admin", "manager", "expert"), get);
  router.post("/", hasRole("admin", "manager", "expert"), create);
  router.get("/:id", hasRole("admin", "manager", "expert"), find);
  router.patch(
    "/:id",
    hasRole("admin", "manager"),
    isSubscriptionManager,
    accept
  );
  router.delete(
    "/:id",
    hasRole("admin", "manager"),
    isSubscriptionManager,
    deny
  );
  return router;
};
