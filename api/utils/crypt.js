const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = {
  hash: (plainText) => bcrypt.hash(plainText, SALT_ROUNDS),
  compare: (plainText, hash) => bcrypt.compare(plainText, hash)
};
