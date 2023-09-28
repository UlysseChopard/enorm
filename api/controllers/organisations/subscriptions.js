const {
  Subscriptions,
  Accounts,
  WGPaths,
  WorkingGroups,
  Registrations,
} = require("models");
const { getDownstream } = require("services/subscriptions");

exports.get = async (req, res, next) => {
  try {
    await Subscriptions.updateReceived(res.locals.accountId);
    const { rows: subscriptions } = await Subscriptions.getByUser(
      res.locals.accountId
    );
    if (req.query.q) {
      const existing = subscriptions.reduce(
        (acc, val) =>
          val.recipient === res.locals.accountId ? acc : acc.add(val.recipient),
        new Set()
      );
      existing.add(res.locals.accountId);
      const results = await Accounts.searchText(req.query.q).then(({ rows }) =>
        rows.filter(({ id }) => !existing.has(id))
      );
      return res.json({ results });
    }
    const providers = [];
    const subscribers = [];
    const sent = [];
    const received = [];
    for (const subscription of subscriptions) {
      delete subscription.hash;
      if (subscription.recipient === res.locals.accountId) {
        if (subscription.accepted_at) {
          subscribers.push(subscription);
        } else {
          received.push(subscription);
        }
      } else {
        if (subscription.accepted_at) {
          providers.push(subscription);
        } else {
          sent.push(subscription);
        }
      }
    }
    return res.json({ providers, subscribers, sent, received });
  } catch (err) {
    next(err);
  }
};

exports.invite = async (req, res, next) => {
  try {
    if (!req.body.recipient)
      return res.status(400).json({ message: "Missing recipient id in body" });
    const {
      rows: [subscription],
    } = await Subscriptions.send(res.locals.accountId, req.body.recipient);
    if (!subscription)
      return res.status(500).json({ message: "Could not send invitation" });
    res.status(201).json({ status: "sent" });
  } catch (err) {
    next(err);
  }
};

exports.establish = async (req, res, next) => {
  try {
    const {
      rows: [subscription],
    } = await Subscriptions.accept(req.params.subscription);
    if (!subscription) {
      return res
        .status(400)
        .json({ message: "No subscription to be established" });
    }
    const { rows: newWGs } = await WorkingGroups.getProvidedByRecipient(
      subscription.recipient
    );
    const impactedSubscriptions = await getDownstream(subscription.sender);
    impactedSubscriptions.add(subscription.id);
    for (const subscription of impactedSubscriptions) {
      for (const wg of newWGs) {
        await WGPaths.add(subscription, wg.id);
      }
    }
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    await Registrations.removeBySubscription(req.params.subscription);
    const {
      rows: [subscription],
    } = await Subscriptions.close(req.params.subscription);
    const { rows: oldWGs } = await WorkingGroups.getProvidedByRecipient(
      subscription.recipient
    );
    const impactedSubscriptions = await getDownstream(subscription.sender);
    for (const subscription of impactedSubscriptions) {
      for (const wg of oldWGs) {
        await WGPaths.remove(subscription, wg.id);
      }
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};