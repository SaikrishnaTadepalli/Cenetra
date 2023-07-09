const classResolver = require("./class");
const logResolver = require("./log");
const studentResolver = require("./student");
const teacherResolver = require("./teacher");
const adminResolver = require("./admin");
const noticeResolver = require("./notice");
const mediaResolver = require("./media");
const profileInfoResolver = require("./profileInfo");
const verificationCodeResolver = require("./verificationCode");
const logTemplateResolver = require("./logTemplate");

const rootResolver = {
  ...classResolver,
  ...logResolver,
  ...studentResolver,
  ...teacherResolver,
  ...adminResolver,
  ...noticeResolver,
  ...mediaResolver,
  ...profileInfoResolver,
  ...verificationCodeResolver,
  ...logTemplateResolver,
};

module.exports = rootResolver;
