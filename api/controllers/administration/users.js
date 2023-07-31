const { createReadStream } = require("fs");
const { pipeline } = require("stream/promises");
const { unlink } = require("fs/promises");
const csvParser = require("csv-parser");
const { regex } = require("../../utils");
const { Organisations, Users } = require("../../models");

exports.add = async (req, res, next) => {
  try {
    const noHeader = req.query?.["no-header"];
    const emailColumn = noHeader
      ? 0
      : req.query?.["email-column"]?.toLowerCase();
    const received = [];
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.userId);
    const ac = new AbortController();
    const stream = createReadStream(req.file.path, {
      encoding: "utf-8",
      emitClose: true,
    }).on("close", async () => {
      await unlink(req.file.path);
    });
    const csv = csvParser({
      headers: !noHeader,
      mapHeaders: ({ header }) =>
        header.toLowerCase() === emailColumn ? emailColumn : null,
      separator: req.query?.separator ?? ",",
      skipLines: 0,
      strict: false,
    })
      .on("headers", (headers) => {
        if (!headers.includes(emailColumn)) {
          ac.abort(`Missing ${emailColumn} header`);
        }
      })
      .on("data", (row) => {
        const email = row[emailColumn];
        if (!regex.isEmail(email)) {
          ac.abort(`${email} is not a valid email`);
          return;
        }
        received.push(email.toLowerCase());
      });
    try {
      await pipeline(stream, csv, { signal: ac.signal });
    } catch (err) {
      if (ac.signal.aborted) {
        if (ac.signal.reason === `Missing ${emailColumn} header`) {
          return res.status(422).json({ message: "Missing email header" });
        }
        return res.status(400).json({ message: ac.signal.reason });
      }
      throw err;
    }
    const { rows: inserted } = await Users.createMany(
      organisation.id,
      received
    );
    res.json({ inserted, received });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.userId);
    if (!organisation) {
      return res.json({ message: "missing organisation" });
    }
    const { rows: users } = await Users.getByOrganisation(organisation.id);
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

exports.unlink = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.userId);
    if (!organisation) {
      return res.status(400).json({ message: "Missing organisation" });
    }
    const {
      rows: [unlinked],
    } = await Users.deleteByIdAndOrganisation(
      organisation.id,
      req.params.userId
    );
    res.json({ unlinked });
  } catch (err) {
    next(err);
  }
};

exports.allow = (req, res, next) => {};

exports.disallow = (req, res, next) => {};
