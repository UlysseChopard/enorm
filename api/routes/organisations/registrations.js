const { Registrations, SubscriptionsManagers } = require("models");
const {
  create,
  accept,
  forward,
  deny,
  get,
  find,
} = require("controllers/organisations/registrations");
const { hasRole } = require("middlewares/roles");

const isSubscriptionManager =
  ({ allowSelfManagement } = { allowSelfManagement: false }) =>
  async (req, res, next) => {
    try {
      if (!req.params.id && !req.body.wgPath) {
        return res
          .status(400)
          .json({ message: "Missing params id or body wgPath" });
      }
      const { rows: subscriptionManagers } = req.params.id
        ? await SubscriptionsManagers.getByRegistration(
            req.params.id,
            req.params.organisation,
          )
        : await SubscriptionsManagers.getByWgPath(
            req.body.wgPath,
            req.params.organisation,
          );
      if (
        subscriptionManagers.find(
          ({ account }) => account === res.locals.accountId,
        )
      ) {
        return next();
      }
      if (req.params.id && allowSelfManagement) {
        const {
          rows: [registration],
        } = await Registrations.find(req.params.id);
        if (registration.beneficiary === res.locals.accountId) return next();
      } else if (allowSelfManagement) {
        throw new Error("allowSelfManagement must be used with req.params.id");
      }
      return res
        .status(403)
        .json({ message: "Only allowed to subscription managers" });
    } catch (err) {
      next(err);
    }
  };

module.exports = ({ Router }) => {
  const router = Router({ mergeParams: true });
  router.get("/", hasRole("admin", "manager", "expert"), get);
  router.get("/:id", hasRole("admin", "manager", "expert"), find);
  router.post(
    "/",
    hasRole("admin", "manager", "expert"),
    isSubscriptionManager({ allowSelfManagement: true }),
    create,
  );
  router.patch(
    "/:id",
    hasRole("admin", "manager"),
    isSubscriptionManager(),
    forward,
  );
  router.delete(
    "/:id",
    hasRole("admin", "manager", "expert"),
    isSubscriptionManager({ allowSelfManagement: true }),
    deny,
  );
  router.post(
    "/:id",
    hasRole("admin", "manager"),
    isSubscriptionManager(),
    accept,
  );
  return router;
};
