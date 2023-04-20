const { Subscriptions, Accounts } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const { rows: subscriptions } = await Subscriptions.getByUser(
      res.locals.userId
    );
    if (req.query.q) {
      const existing = subscriptions.reduce(
        (acc, val) =>
          val.recipient === res.locals.userId ? acc : acc.add(val.recipient),
        new Set()
      );
      const results = await Accounts.searchText(req.query.q).then(({ rows }) =>
        rows.filter(({ id }) => !existing.has(id))
      );
      return res.json({ results });
    }
    subscriptions.forEach((s) => delete s.hash);
    return res.json({ subscriptions });
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
    const { rows } = await Subscriptions.accept(req.params.subscription);
    if (!rows.length)
      return res
        .status(400)
        .json({ message: "No subscription to be established" });
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
