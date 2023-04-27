const { Registrations, WorkingGroups, Subscriptions } = require("../models");

const getDecisionMaker = async (userId, wg) => {
  const queue = [userId];
  while (queue.length) {
    const userId = queue.shift();
    const { rows } = await WorkingGroups.getByUserId(userId);
    if (rows.map(({ id }) => id).includes(wg)) return userId;
    const { rows: subscriptions } = await Subscriptions.getAccepted(userId);
    queue.push(...subscriptions.map(({ recipient }) => recipient));
  }
};

exports.accept = async (req, res, next) => {
  try {
    const decisionMaker = await getDecisionMaker(
      res.locals.userId,
      req.body.id
    );
    if (decisionMaker === res.locals.userId) {
      await Registrations.accept({
        beneficiary: req.body.beneficiary,
        workingGroup: req.body.id,
      });
      return res.sendStatus(204);
    }
    const {
      rows: [registration],
    } = await Registrations.request({
      beneficiary: req.body.beneficiary,
      workingGroup: req.body.id,
      prevStep: req.params.id,
      decisionMaker,
    });
    return res.json({ registration });
  } catch (err) {
    next(err);
  }
};

exports.deny = () => {};

exports.get = async (req, res, next) => {
  try {
    const { rows: links } = await Registrations.getSended(res.locals.userId);
    const sended = [];
    const received = [];
    for (const link of links) {
      if (link.beneficiary == res.locals.userId) {
        sended.push(link);
      } else {
        received.push(link);
      }
    }
    res.json({ sended, received });
  } catch (err) {
    next(err);
  }
};

exports.request = async (req, res, next) => {
  try {
    const {
      rows: [registration],
    } = await Registrations.request({
      beneficiary: res.locals.userId,
      workingGroup: req.body.group,
      decisionMaker: req.body.decisionMaker,
    });
    res.status(201).json({ registration });
  } catch (err) {
    next(err);
  }
};
