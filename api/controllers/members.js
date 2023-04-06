const { Members } = require("../models");

exports.add = async (req, res, next) => {
  try {
    // send invitation by email
    const {
      rows: [member],
    } = await Members.create(res.locals.userId, req.body.email);
    if (!member) {
      return res
        .status(400)
        .json({ message: "Could not create member account" });
    }
    res.status(201).json({ member });
  } catch (err) {
    next(err);
  }
};

exports.join = async (req, res, next) => {
  try {
    const result = await Members.join(res.locals.userId, req.params.id);
    console.log(result, res.locals.userId, req.params.id);
    if (result.rowCount !== 1) {
      return res.status(400).json({ message: "Could not join membership" });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const {
      rows: [member],
    } = await Members.remove(res.locals.userId, req.params.id);
    if (!member) {
      return res.status(400).json({ message: "Could not remove member" });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { rows: members } = await Members.getAll(res.locals.userId);
    res.json({ members });
  } catch (err) {
    next(err);
  }
};
