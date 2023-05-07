const { WorkingGroups } = require("../models");

exports.get = async (_req, res, next) => {
  try {
    const { rows: groups } = await WorkingGroups.getByUserId(res.locals.userId);
    res.json({ groups });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { group } = req.body;
    const {
      rows: [newGroup],
    } = await WorkingGroups.create(res.locals.userId, group);
    res.status(201).json({ group: newGroup });
  } catch (err) {
    next(err);
  }
};
