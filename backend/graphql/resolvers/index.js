const classResolver = require("./class");
const logResolver = require("./log");
const studentResolver = require("./student");
const teacherResolver = require("./teacher");

const rootResolver = {
  ...classResolver,
  ...logResolver,
  ...studentResolver,
  ...teacherResolver,
};

module.exports = rootResolver;
