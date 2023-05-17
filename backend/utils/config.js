require("dotenv").config();

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = parseInt(process.env.JWT_EXPIRY);

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_CREDENTIALS = process.env.S3_CREDENTIALS;

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  JWT_EXPIRY,
  S3_BUCKET_NAME,
  S3_CREDENTIALS,
};
