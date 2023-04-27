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
    const newGroup = await WorkingGroups.create(res.locals.userId, group);
    res.status(201).json({ group: newGroup });
  } catch (err) {
    next(err);
  }
};

// TODO: remove
exports.getById = async (req, res, next) => {
  try {
    const {
      rows: [group],
    } = await WorkingGroups.getById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "WG not found" });
    }
    res.json({ group });
  } catch (err) {
    next(err);
  }
};
