const aws = require("aws-sdk");
const config = require("./config");
const crypto = require("crypto");
const { promisify } = require("util");

const region = config.S3_CREDENTIALS.region;
const bucketName = config.S3_BUCKET_NAME;
const accessKeyId = config.S3_CREDENTIALS.accessKeyId;
const secretAccessKey = config.S3_CREDENTIALS.secretAccessKey;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

const randomBytes = promisify(crypto.randomBytes);

const getViewURL = async (fileName) => {
  let URL =
    "https://" + config.S3_BUCKET_NAME + ".s3.amazonaws.com/" + fileName;

  return URL;
};

const generateUploadURL = async () => {
  const rawBytes = await randomBytes(16);
  const fileName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 300, // 300 Seconds to post to URL before it expires
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return {
    uploadURL: uploadURL,
    fileName: fileName,
  };
};

module.exports = {
  generateUploadURL,
  getViewURL,
};
