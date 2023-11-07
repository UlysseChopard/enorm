const { WorkingGroups, WGPaths } = require("models");
const { getDownstream } = require("services/subscriptions");

exports.get = async (req, res, next) => {
  try {
    const { rows: groups } = await WorkingGroups.get(
      res.locals.accountId,
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
    } = await WorkingGroups.create(req.params.organisation, req.body.group);
    const impactedSubscriptions = await getDownstream(req.locals.accountId);
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
    const { rows: wgs } = await WorkingGroups.find(req.params.wg);
    const wg = wgs[0];
    wg.wgPaths = wgs.map(({ wg_path }) => wg_path).filter((v) => v !== null);
    delete wg.wg_path;
    res.json({ wg });
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
