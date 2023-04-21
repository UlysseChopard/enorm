const { WorkingGroups, Subscriptions } = require("../models");

const getGroups = async (userId, groups) => {
  if (groups.has(userId)) return;
  const { rows } = await WorkingGroups.getAll(userId);
  groups.set(userId, rows);
  const { rows: subscriptions } = await Subscriptions.getAccepted(userId);
  for (const { recipient } of subscriptions) {
    await getGroups(recipient, groups);
  }
};

exports.get = async (_req, res, next) => {
  try {
    const map = new Map();
    await getGroups(res.locals.userId, map);
    const groups = [];
    for (const userGroups of map.values()) {
      groups.push(...userGroups);
    }
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

exports.getById = async (req, res, next) => {
  try {
    const map = new Map();
    await getGroups(res.locals.userId, map);
    for (const [decisionMaker, groups] of map) {
      for (const group of groups) {
        if (group.id === parseInt(req.params.id)) {
          return res.json({ decisionMaker, group });
        }
      }
    }
    return res
      .status(401)
      .json({ message: "not allowed to access this group" });
  } catch (err) {
    next(err);
  }
};
