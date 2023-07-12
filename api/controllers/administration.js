const { createReadStream } = require("fs");
const { pipeline } = require("stream/promises");
const { unlink } = require("fs/promises");
const csvParser = require("csv-parser");
const { Organisations, Users } = require("../models");

exports.linkUsers = async (req, res, next) => {
  try {
    const emailColumn = req.query?.["email-column"] ?? "email";
    const received = [];
    const invalids = [];
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
      mapHeaders: ({ header }) => header.toLowerCase(),
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
        if (row[emailColumn].includes("@")) {
          received.push(row[emailColumn]);
        } else {
          invalids.push(row[emailColumn]);
        }
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
    res.json({ inserted, received, invalids });
  } catch (err) {
    next(err);
  }
};

exports.updateOrganisation = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.update(req.params.id, {
      name: req.body?.name,
      admin: res.locals.userId,
    });
    res.status(201).json({ organisation });
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
    const { rows: users } = await Users.getBySociety(organisation.id);
    res.json({ organisation, users });
  } catch (err) {
    next(err);
  }
};

exports.unlinkUser = (req, res, next) => {};

exports.giveRole = (req, res, next) => {};

exports.withdrawRole = (req, res, next) => {};
