const { Groups, Accounts } = require("../models");

exports.get = async (_req, res, next) => {
  try {
    const { rows: groups } = await Groups.getAll();
    res.json({ groups });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { group } = req.body;
    const {
      rows: [{ company: sponsor }],
    } = await Accounts.getById(res.locals.userId);
    const newGroup = await Groups.create(res.locals.userId, {
      ...group,
      sponsor,
    });
    res.status(201).json({ group: newGroup });
  } catch (err) {
    next(err);
  }
};
