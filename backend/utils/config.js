require("dotenv").config();

const PORT = process.env.PORT;

const MONGODB_URI =

  process.env.NODE_ENV === "DEV"
    ? process.env.MONGODB_URI_DEV
    : process.env.MOBGODB_URI_PROD;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = parseInt(process.env.JWT_EXPIRY);

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_CREDENTIALS = process.env.S3_CREDENTIALS;

const SNS_CREDENTIALS = process.env.SNS_CREDENTIALS;
const SNS_ACCESS_KEY_ID = process.env.SNS_ACCESS_KEY_ID;
const SNS_SECRET_ACCESS_KEY = process.env.SNS_SECRET_ACCESS_KEY;
const SNS_REGION = process.env.SNS_REGION;

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;

const SHOULD_SEND_SMS = process.env.SHOULD_SEND_SMS === "true";

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  JWT_EXPIRY,
  S3_BUCKET_NAME,
  S3_CREDENTIALS,
  SNS_CREDENTIALS,
  SNS_ACCESS_KEY_ID,
  SNS_SECRET_ACCESS_KEY,
  SNS_REGION,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
  SHOULD_SEND_SMS,
};
