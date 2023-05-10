const { WorkingGroups, WGPaths, Subscriptions } = require("../models");

const propagate = async (userId, wg) => {
  const queue = new Map();
  const { rows: subscriptions } = await Subscriptions.getSubscribers(userId);
  for (const { sender, id } of subscriptions) {
    queue.set(id, sender);
  }
  for (const [subscription, subscriber] of queue.entries()) {
    const { rows: subscriptions } = await Subscriptions.getSubscribers(
      subscriber
    );
    for (const { sender, id } of subscriptions) {
      if (sender === userId) continue;
      queue.set(id, sender);
    }
    await WGPaths.add(subscription, wg);
  }
  console.log(queue);
};

exports.get = async (_req, res, next) => {
  try {
    const { rows: wgs } = await WorkingGroups.getByUser(res.locals.userId);
    const groups = wgs.map((wg) => {
      wg.wg_path = wg.id;
      delete wg.id;
      return wg;
    });
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
