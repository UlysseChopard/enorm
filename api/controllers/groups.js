const { Groups, Companies, Subscriptions } = require("../models");

const getGroups = async (userId, groups) => {
  if (groups.has(userId)) return;
  const { rows } = groups.size
    ? await Groups.getVisibles(userId)
    : await Groups.getAll(userId);
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
    const {
      rows: [company],
    } = await Companies.getByCreator(res.locals.userId);
    const newGroup = await Groups.create(res.locals.userId, {
      ...group,
      sponsor: company.id,
    });
    res.status(201).json({ group: newGroup });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const map = new Map();
    await getGroups(res.locals.userId, map);
    const mapValues = map.values();
    for (
      let group = mapValues.next();
      group.value.map(({ id }) => id).includes(req.params.id);
      group = mapValues.next()
    ) {
      if (group.done) {
        return res
          .status(401)
          .json({ message: "not allowed to access this group" });
      }
    }
    const {
      rows: [group],
    } = await Groups.getById(req.params.id);
    if (!group) return res.status(404).json({ message: "group id not found" });
    return res.json({ group });
  } catch (err) {
    next(err);
  }
};
