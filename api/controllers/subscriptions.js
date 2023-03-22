const { Subscriptions, Accounts } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const { rows: received } = await Subscriptions.getPendingReceived(
      res.locals.userId
    );
    const { rows: sended } = await Subscriptions.getPendingSended(
      res.locals.userId
    );
    const { rows: subscribed } = await Subscriptions.getAcceptedSended(
      res.locals.userId
    );
    const { rows: accepted } = await Subscriptions.getAcceptedReceived(
      res.locals.userId
    );
    const existing = new Set([
      ...received.concat(accepted).map(({ sender }) => sender),
      ...sended.concat(subscribed).map(({ recipient }) => recipient),
      res.locals.userId,
    ]);
    const results = req.query.q
      ? await Accounts.searchText(req.query.q).then(({ rows }) =>
          rows.filter(({ id }) => !existing.has(id))
        )
      : null;
    return res.json({
      subscribed,
      accepted,
      sended,
      received,
      results,
    });
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
