const { Accounts, Subscriptions } = require("../models");

exports.get = async (req, res, next) => {
  try {
    if (req.query.q) {
      const { rows } = await Accounts.searchText(
        req.query.q,
        res.locals.userId
      );
      console.log(rows);
      return res.json({ accounts: rows });
    }
    const { rows: sended } = await Subscriptions.getSended(res.locals.userId);
    const { rows: received } = await Subscriptions.getReceived(
      res.locals.userId
    );
    return res.json({ sended, received });
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

exports.establish = (req, res) => res.sendStatus(201);

exports.close = (req, res) => res.sendStatus(200);
