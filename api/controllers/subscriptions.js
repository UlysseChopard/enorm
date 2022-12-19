const { Subscriptions } = require("../models");

exports.getReceived = async (req, res, next) => {
  try {
    const subscriptions = await Subscriptions.getReceived();
    res.json(subscriptions);
  } catch (err) {
    next(err);
  }
};

exports.getSent = async (req, res, next) => {
  try {
    const subscriptions = await Subscriptions.getSent();
    res.json(subscriptions);
  } catch (err) {
    next(err);
  }
};

exports.send = async (req, res, next) => {
  try {
    const subscription = await Subscriptions.open();
    res.json({ subscription });
  } catch (err) {
    next(err);
  }
};

exports.cancel = async (req, res, next) => {
  try {
    const subscription = await Subscriptions.cancel();
    res.json({ subscription });
  } catch (err) {
    next(err);
  }
};

exports.accept = async (req, res, next) => {
  try {
    const subscription = await Subscriptions.accept(req.params.id);
    res.json({ subscription });
  } catch (err) {
    next(err);
  }
};

exports.deny = async (req, res, next) => {
  try {
    const subscription = await Subscriptions.deny(req.params.id);
    res.json({ subscription });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.put("/:wg/:path", send);
  router.delete("/:wg/:path", cancel);
};
