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
    if (!req.params.id || !req.body.wgPath) {
      return res
        .status(400)
        .json({ message: "Missing params id or body wgPath" });
    }
    const { rows: subscriptionManagers } = req.params.id
      ? await SubscriptionsManagers.getByRegistration(req.params.id)
      : await SubscriptionsManagers.getByWgPath(req.body.wgPath);
    if (
      !subscriptionManagers.find(
        ({ account }) => account === res.locals.accountId,
      )
    ) {
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
  router.get("/:id", hasRole("admin", "manager", "expert"), find);
  router.post("/", hasRole("admin", "manager", "expert"), create);
  router.patch(
    "/:id",
    hasRole("admin", "manager"),
    isSubscriptionManager,
    accept,
  );
  router.delete(
    "/:id",
    hasRole("admin", "manager"),
    isSubscriptionManager,
    deny,
  );
  return router;
};
