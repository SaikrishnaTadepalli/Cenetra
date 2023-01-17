const classResolver = require("./class");
const logResolver = require("./log");
const studentResolver = require("./student");
const teacherResolver = require("./teacher");
const noticeResolver = require("./notice");
const mediaResolver = require("./media");

const rootResolver = {
  ...classResolver,
  ...logResolver,
  ...studentResolver,
  ...teacherResolver,
  ...noticeResolver,
  ...mediaResolver,
};

module.exports = rootResolver;
