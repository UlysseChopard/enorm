const { createReadStream } = require("fs");
const { pipeline } = require("stream/promises");
const { unlink } = require("fs/promises");
const csvParser = require("csv-parser");
const { regex, mail } = require("utils");
const { Organisations, OrganisationsMembers } = require("models");
const { BASE_URL } = process.env;

exports.add = async (req, res, next) => {
  try {
    const noHeader = req.query?.["no-header"];
    const emailColumn = noHeader
      ? 0
      : req.query?.["email-column"]?.toLowerCase();
    const received = [];
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.accountId);
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
    const { rows: inserted } = await OrganisationsMembers.createMany(
      organisation.id,
      received
    );
    for (const invited of inserted) {
      await mail.send({
        recipient: invited.email,
        subject: `You have been invitated to join ${organisation.name} on Enorm`,
        text: `Please click here to join ${organisation.name} on Enorm: ${BASE_URL}. Your token is ${invited.token}`,
      });
    }
    res.json({ inserted, received });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.accountId);
    if (!organisation) {
      return res.status(400).json({ message: "Missing organisation" });
    }
    const { rows } = await OrganisationsMembers.getByOrganisation(organisation.id);
    const users = Object.values(
      rows.reduce((acc, user) => {
        if (!acc[user.id]) {
          acc[user.id] = {
            ...user,
            establishments: user?.establishment ? [user.establishment] : [],
          };
          return acc;
        }
        acc[user.id].establishments.push(user.establishment);
        return acc;
      }, {})
    );
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

exports.unlink = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.accountId);
    if (!organisation) {
      return res.status(400).json({ message: "Missing organisation" });
    }
    const {
      rows: [unlinked],
    } = await OrganisationsMembers.deleteByIdAndOrganisation(
      organisation.id,
      req.params.userId
    );
    res.json({ unlinked });
  } catch (err) {
    next(err);
  }
};

exports.allow = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.accountId);
    if (!organisation) {
      return res.status(400).json({ message: "Missing organisation" });
    }
    const {
      rows: [updated],
    } = await OrganisationsMembers.manageRoleByIdAndOrganisation(
      organisation.id,
      req.params.userId,
      { role: req.params.role, value: true }
    );
    res.json({ updated });
  } catch (err) {
    next(err);
  }
};

exports.disallow = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.accountId);
    if (!organisation) {
      return res.status(400).json({ message: "Missing organisation" });
    }
    const {
      rows: [updated],
    } = await OrganisationsMembers.manageRoleByIdAndOrganisation(
      organisation.id,
      req.params.userId,
      { role: req.params.role, value: false }
    );
    res.json({ updated });
  } catch (err) {
    next(err);
  }
};
