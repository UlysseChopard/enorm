const { WorkingGroups, WGPaths } = require("../models");
const { getDownstream } = require("../services/subscriptions");

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
    const impactedSubscriptions = await getDownstream(res.locals.userId);
    for (const subscription of impactedSubscriptions) {
      await WGPaths.add(subscription, group.id);
    }
    res.status(201).json({ group });
  } catch (err) {
    next(err);
  }
};

exports.find = async (req, res, next) => {
  try {
    const { rows: paths } = await WorkingGroups.find(
      res.locals.userId,
      req.params.id
    );
    res.json({ paths });
  } catch (err) {
    next(err);
  }
};
