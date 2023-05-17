const classResolver = require("./class");
const logResolver = require("./log");
const studentResolver = require("./student");
const teacherResolver = require("./teacher");
const mediaResolver = require("./media");

const rootResolver = {
  ...classResolver,
  ...logResolver,
  ...studentResolver,
  ...teacherResolver,
  ...mediaResolver,
};

module.exports = rootResolver;
