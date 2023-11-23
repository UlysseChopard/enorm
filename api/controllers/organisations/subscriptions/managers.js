const { SubscriptionsManagers } = require("models");

exports.add = async (req, res, next) => {
  try {
    const {
      rows: [subscriptionManager],
    } = await SubscriptionsManagers.add(
      req.params.subscription,
      req.params.manager
    );
    res.json({ subscriptionManager });
  } catch (err) {
    next(err);
  }
};
