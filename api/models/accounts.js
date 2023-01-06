/* eslint-disable no-unused-vars */
const { crypt } = require("../utils");

const USER_TEST = ({ email: "test.test@test.test", firstname: "test", lastname: "test", password: "test" });

exports.getByEmail = (email) => USER_TEST;

exports.getById = (id) => USER_TEST;
 
exports.create = (user) => USER_TEST;

exports.update = (user) => ({ ...USER_TEST, firstname: "updated_test" });

exports.close = (user) => USER_TEST;
