const { SubscriptionsManagers } = require("models");

exports.add = async (req, res, next) => {
  try {
    const {
      rows: [subscriptionManager],
    } = await SubscriptionsManagers.add(
      req.params.subscription,
      req.body.organisationMember
    );
    res.json({ subscriptionManager });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const {
      rows: [subscriptionManager],
    } = await SubscriptionsManagers.remove(req.params.manager);
    res.json({ subscriptionManager });
  } catch (err) {
    next(err);
  }
};
