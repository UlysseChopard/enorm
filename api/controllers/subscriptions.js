const { Subscriptions, Accounts } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const { rows: searchResults } = await Accounts.searchText(req.query.q);
    const { rows: received } = await Subscriptions.getPendingReceived(
      res.locals.userId
    );
    const { rows: sended } = await Subscriptions.getPendingSended(
      res.locals.userId
    );
    const { rows: sendedOk } = await Subscriptions.getAcceptedSended(
      res.locals.userId
    );
    const { rows: receivedOk } = await Subscriptions.getAcceptedReceived(
      res.locals.userId
    );
    const accepted = sendedOk.concat(receivedOk);
    const exceptIds = new Set(
      sended
        .map(({ id }) => id)
        .concat(received.map(({ id }) => id))
        .concat(accepted.map(({ id }) => id))
    );
    const results = searchResults.filter(
      ({ id }) => id !== res.locals.userId && !exceptIds.has(id)
    );
    return res.json({ accepted, sended, received, results });
  } catch (err) {
    next(err);
  }
};

exports.invite = async (req, res, next) => {
  try {
    if (!req.body.recipient)
      return res.status(400).json({ message: "Missing recipient id in body" });
    const {
      rows: [previousSubscription],
    } = await Subscriptions.getPrevious(res.locals.userId, req.body.recipient);
    if (previousSubscription?.sended_at && !previousSubscription.rejected_at)
      return res.status(400).json({ message: "Invitation already sent" });
    const {
      rows: [subscription],
    } = previousSubscription
      ? await Subscriptions.reset(previousSubscription.id)
      : await Subscriptions.send(res.locals.userId, req.body.recipient);
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
    const { rows } = await Subscriptions.close(req.params.subscription);
    if (!rows.length)
      return res.status(400).json({ message: "No subscription to close" });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
