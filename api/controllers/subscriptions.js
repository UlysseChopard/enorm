const { Subscriptions, Accounts, Links } = require("../models");

exports.get = async (req, res, next) => {
  try {
    await Subscriptions.updateReceived(res.locals.userId);
    const { rows: subscriptions } = await Subscriptions.getByUser(
      res.locals.userId
    );
    if (req.query.q) {
      const existing = subscriptions.reduce(
        (acc, val) =>
          val.recipient === res.locals.userId ? acc : acc.add(val.recipient),
        new Set()
      );
      existing.add(res.locals.userId);
      const results = await Accounts.searchText(req.query.q).then(({ rows }) =>
        rows.filter(({ id }) => !existing.has(id))
      );
      return res.json({ results });
    }
    const providers = [];
    const subscribers = [];
    const sended = [];
    const received = [];
    for (const subscription of subscriptions) {
      delete subscription.hash;
      if (subscription.recipient === res.locals.userId) {
        if (subscription.accepted_at) {
          subscribers.push(subscription);
        } else {
          received.push(subscription);
        }
      } else {
        if (subscription.accepted_at) {
          providers.push(subscription);
        } else {
          sended.push(subscription);
        }
      }
    }
    return res.json({ providers, subscribers, sended, received });
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
    } = await Subscriptions.send(res.locals.userId, req.body.recipient);
    if (!subscription)
      return res.status(500).json({ message: "Could not send invitation" });
    res.status(201).json({ status: "sended" });
  } catch (err) {
    next(err);
  }
};

exports.establish = async (req, res, next) => {
  try {
    const {
      rows: [{ id, recipient, sender }],
    } = await Subscriptions.accept(req.params.subscription);
    if (!id) {
      return res
        .status(400)
        .json({ message: "No subscription to be established" });
    }
    await Links.create({
      subscription: id,
      recipient,
      sender,
    });
    const { rows: subscriptions } = Subscriptions.getSubscribers(
      res.locals.userId
    );
    for (const { id, sender } of subscriptions) {
      await Links.create({
        subscription: id,
        recipient: res.locals.userId,
        sender,
      });
    }
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    const { rowCount } = await Subscriptions.close(req.params.subscription);
    if (!rowCount)
      return res.status(400).json({ message: "No subscription to close" });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
