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
  router.post("/", hasRole("admin", "manager"), create);
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
