const { WorkingGroups, Subscriptions, Registrations } = require("../models");

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
    const decisionMakers = [];
    let group = null;
    for (const [decisionMaker, groups] of map) {
      for (const g of groups) {
        if (g.id === parseInt(req.params.id)) {
          decisionMakers.push(decisionMaker);
          group = g;
        }
      }
    }
    if (!group) {
      return res
        .status(401)
        .json({ message: "not allowed to access this group" });
    }
    return res.json({ decisionMakers, group });
  } catch (err) {
    next(err);
  }
};

exports.join = async (req, res, next) => {
  try {
    if (!req.body.decisionMaker)
      return res.status(400).json({ message: "missing decisionMaker in body" });
    const {
      rows: [registration],
    } = await Registrations.ask({
      beneficiary: res.locals.userId,
      group: req.params.id,
      decisionMaker: req.body.decisionMaker,
    });
    res.status(201).json({ registration });
  } catch (err) {
    next(err);
  }
};
