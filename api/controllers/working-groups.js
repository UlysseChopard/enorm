const { WorkingGroups, WGPaths, Subscriptions } = require("../models");

const propagate = async (
  userId,
  wg,
  subscription = null,
  propagated = new Set()
) => {
  if (propagated.has(subscription)) return;
  if (subscription) {
    await WGPaths.add(subscription, wg);
  }
  const { rows: subscriptions } = await Subscriptions.getSubscribers(userId);
  for (const subscription of subscriptions) {
    propagated.add(subscription.id);
    await propagate(subscription.sender, wg, subscription.id, propagated);
  }
};

exports.get = async (_req, res, next) => {
  try {
    const { rows: groups } = await WorkingGroups.getByUser(res.locals.userId);
    res.json({ groups });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      rows: [group],
    } = await WorkingGroups.create(res.locals.userId, req.body.group);
    await propagate(res.locals.userId, group.id);
    res.status(201).json({ group });
  } catch (err) {
    next(err);
  }
};

exports.find = async (req, res, next) => {
  try {
    const {
      rows: [wg],
    } = await WorkingGroups.find(res.locals.userId, req.params.id);
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};
