require("dotenv").config();

const PORT = process.env.PORT;

const BACKEND_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_BACKEND_URI
    : process.env.BACKEND_URI;

module.exports = {
  BACKEND_URI,
};
