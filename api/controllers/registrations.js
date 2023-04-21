const { Registrations } = require("../models");

exports.accept = () => {};

exports.deny = () => {};

exports.ask = async (req, res, next) => {
  try {
    console.log(req.body)
    const {
      rows: [registration],
    } = await Registrations.ask({
      beneficiary: res.locals.userId,
      group: req.body.group,
      decisionMaker: req.body.decisionMaker,
    });
    res.status(201).json({ registration });
  } catch (err) {
    next(err);
  }
};
