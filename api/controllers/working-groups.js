const { WorkingGroups } = require("../models");

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
      rows: [newGroup],
    } = await WorkingGroups.create(res.locals.userId, req.body.group);
    res.status(201).json({ group: newGroup });
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
