const { WorkingGroups, WGPaths } = require("models");
const { getDownstream } = require("services/subscriptions");

exports.get = async (req, res, next) => {
  try {
    const { rows: groups } = await WorkingGroups.getByOrganisation(
      req.params.organisation
    );
    res.json({ groups });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      rows: [group],
    } = await WorkingGroups.create(req.body.group);
    const impactedSubscriptions = await getDownstream(res.locals.accountId);
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
    } = await WorkingGroups.find(req.params.wg);
    const { rows: wgPaths } = await WGPaths.find(
      res.locals.accountId,
      req.params.wg
    );
    res.json({ wg, wgPaths });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const {
      rows: [wg],
    } = await WorkingGroups.remove(req.params.wg);
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};
