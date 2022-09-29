const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const { transform } = require("stream-transform");
const db = require("../index");
const format = require("pg-format");

const parser = parse({
  delimiter: ";",
  trim: true,
  encoding: "latin1",
  headers: true,
});

parser.on("readable", async () => {
  let record;
  while ((record = parser.read()) !== null) {
    const parsedRecord = record.map((item) => {
      if (item === "FAUX") return 0;
      if (item === "VRAI") return 1;
      let syndicate;
      if ((syndicate = item.match(/\w+\s?=\s?(\d+)/i))) return syndicate[1];
      return item;
    });
    const query = format(
      "INSERT INTO organisations (name, short_name, is_consultant, is_syndicate, society_name, client_name, syndicate_no, sector_act, status_part, person_in_charge, civil_name, civil_short_name, main_address, secondary_address, postcode, city, country, is_us_postcode, phone_no, fax, website) VALUES (%L)",
      parsedRecord
    );
    try {
      await db.query(query);
    } catch (err) {
      console.error(err.message);
    }
  }
});

parser.on("error", console.error);

parser.on("end", parser.end);

fs.createReadStream(path.join(__dirname, "organismes.csv")).pipe(parser);
