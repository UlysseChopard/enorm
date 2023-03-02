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
      return res.status(400).json({ message: "Missing recipient id in url" });
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
    await Subscriptions.accept(req.params.subscription);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    await Subscriptions.close(req.params.subscription);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
