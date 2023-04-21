const { Registrations, WorkingGroups, Subscriptions } = require("../models");

const getDecisionMaker = async (userId, wg) => {
  const queue = [userId];
  while (queue.length) {
    const userId = queue.shift();
    const { rows } = await WorkingGroups.getAll(userId);
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
    } = await Registrations.ask({
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
    const { rows: registrations } = await Registrations.get(res.locals.userId);
    const sended = [];
    const received = [];
    for (const r of registrations) {
      if (r.beneficiary == res.locals.userId) {
        sended.push(r);
      } else {
        received.push(r);
      }
    }
    res.json({ sended, received });
  } catch (err) {
    next(err);
  }
};

exports.ask = async (req, res, next) => {
  try {
    const {
      rows: [registration],
    } = await Registrations.ask({
      beneficiary: res.locals.userId,
      workingGroup: req.body.group,
      decisionMaker: req.body.decisionMaker,
    });
    res.status(201).json({ registration });
  } catch (err) {
    next(err);
  }
};
