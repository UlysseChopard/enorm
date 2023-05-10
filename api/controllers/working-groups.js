const { WorkingGroups, WGPaths } = require("../models");
const { getDownstream } = require("../services/subscriptions");

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
    const {
      rows: [wg],
    } = await WorkingGroups.find(res.locals.userId, req.params.id);
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};
