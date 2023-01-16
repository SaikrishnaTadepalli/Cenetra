const AWS = require("aws-sdk");

//   AWS.config.loadFromPath("./credentials.json");

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const singleFileUpload = async (file) => {
  const { filename, mimetype, createReadStream } = await file;

  const fileStream = createReadStream();
  const path = require("path");

  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(filename);

  const uploadParams = {
    Bucket: "cenetra-media-dev",
    Key,
    Body: fileStream,
  };

  const result = await s3.upload(uploadParams).promise();
  return result.Key;
};

module.exports = { s3, singleFileUpload };
