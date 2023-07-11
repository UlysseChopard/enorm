const { createReadStream } = require("fs");
const { pipeline, finished } = require("stream/promises");
const { unlink } = require("fs/promises");
const csvParser = require("csv-parser");
const { Organisations, Users } = require("../models");

exports.linkUsers = async (req, res, next) => {
  try {
    let error = false;
    const emails = [];
    const separator = req.query?.separator ?? ",";
    const emailColumn = req.query?.["email-column"] ?? "email";
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.userId);
    const stream = createReadStream(req.file.path, {
      encoding: "utf-8",
    });
    const csv = csvParser({
      mapHeaders: ({ header }) => header.toLowerCase(),
      separator,
      skipLines: 0,
      strict: false,
    });
    csv
      .on("headers", (headers) => {
        if (!headers.includes(emailColumn)) {
          error = new Error(`Missing ${emailColumn} header`);
          csv.destroy();
          stream.destroy();
        }
      })
      .on("error", (err) => {
        error = err;
        stream.resume();
      })
      .on("data", (row) => {
        console.log("data");
        emails.push(row[emailColumn]);
      });

    await pipeline(stream, csv, console.error);
    await finished(stream);
    await finished(csv);
    await unlink(req.file.path);
    if (error.message === `Missing ${emailColumn} header`) {
      return res.status(422).json({ message: "Missing email header" });
    }
    if (error) {
      throw error;
    }
    console.log(emails);
    const { rows: users } = Users.createMany(organisation.id, emails);
    res.json({ users });
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
