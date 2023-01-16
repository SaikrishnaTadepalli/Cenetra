require("dotenv").config();

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = parseInt(process.env.JWT_EXPIRY);

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  JWT_EXPIRY,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
};
