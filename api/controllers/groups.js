const { Groups, Companies, Subscriptions } = require("../models");

exports.get = async (_req, res, next) => {
  try {
    const { rows: subscriptions } = await Subscriptions.getAccepted(
      res.locals.userId
    );
    const groups = [];
    for (const subscription of subscriptions) {
      const { rows } = await Groups.getAll(
        subscription.sender === res.locals.userId
          ? subscription.recipient
          : subscription.sender
      );
      groups.push(...rows);
    }
    const { rows } = await Groups.getAll(res.locals.userId);
    groups.push(...rows);
    res.json({ groups });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { group } = req.body;
    // What if many companies created by the same user ?
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
