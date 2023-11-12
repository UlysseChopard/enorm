const { createReadStream } = require("fs");
const { pipeline } = require("stream/promises");
const { unlink } = require("fs/promises");
const csvParser = require("csv-parser");
const { regex, mail } = require("utils");
const { Organisations, OrganisationsMembers, Accounts } = require("models");
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
    const { rows: accounts } = await Accounts.createMany(received, "!");
    const { rows: created } = await OrganisationsMembers.createMany(
      organisation.id,
      accounts
    );
    // for (const invited of inserted) {
    //   await mail.send({
    //     recipient: invited.email,
    //     subject: `You have been invitated to join ${organisation.name} on Enorm`,
    //     text: `Please click here to join ${organisation.name} on Enorm: ${BASE_URL}. Your token is ${invited.token}`,
    //   });
    // }
    res.json({ members: { created, received } });
  } catch (err) {
    next(err);
  }
};

exports.addOne = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.create({ email: req.body.email });
    const {
      rows: [organisationMember],
    } = await OrganisationsMembers.create({
      organisation: req.params.organisation,
      email: req.body.email,
      account: account.id,
    });
    res.json({ member: organisationMember });
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
    const { rows } = await OrganisationsMembers.getByOrganisation(
      organisation.id
    );
    const users = Object.values(
      rows.reduce((acc, user) => {
        if (!acc[user.id]) {
          acc[user.id] = user;
          acc[user.id].establishments = user.establishment
            ? [user.establishment]
            : [];
          delete acc[user.id].establishment;
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
      req.params.member
    );
    res.json({ unlinked });
  } catch (err) {
    next(err);
  }
};

exports.join = async (req, res, next) => {
  try {
    const {
      rows: [user],
    } = await OrganisationsMembers.setMemberAccount(
      res.locals.accountId,
      req.params.id
    );
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};
