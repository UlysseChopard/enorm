const { Establishments, EstablishmentsUsers } = require("../../models");

exports.get = async (req, res, next) => {
  try {
    const { rows: establishments } = await Establishments.getByAdmin(
      res.locals.accountId
    );
    res.json({ establishments });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      rows: [establishment],
    } = await Establishments.create(res.locals.accountId, req.body);
    res.json({ establishment });
  } catch (err) {
    next(err);
  }
};

exports.replace = async (req, res, next) => {
  try {
    const {
      rows: [establishment],
    } = await Establishments.replaceAsAdmin(
      res.locals.accountId,
      req.params.id,
      {
        ...req.body,
      }
    );
    res.json({ establishment });
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    const {
      rows: [closed],
    } = await Establishments.closeAsAdmin(res.locals.accountId, req.params.id);
    res.json({ closed });
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const {
      rows: [added],
    } = await EstablishmentsUsers.addAsAdmin(
      res.locals.accountId,
      req.params.id,
      req.params.userId
    );
    res.status(201).json({ added });
  } catch (err) {
    next(err);
  }
};

exports.removeUser = async (req, res, next) => {
  try {
    const {
      rows: [removed],
    } = await EstablishmentsUsers.removeAsAdmin(
      res.locals.accountId,
      req.params.id,
      req.params.userId
    );
    res.json({ removed });
  } catch (err) {
    next(err);
  }
};
