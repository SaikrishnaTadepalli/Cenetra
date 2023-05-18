const aws = require("aws-sdk");
const config = require("./config");

// Create an instance of AWS.SNS
const sns = new aws.SNS({
  region: "YOUR_AWS_REGION",
  accessKeyId: "YOUR_AWS_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_AWS_SECRET_ACCESS_KEY",
});

exports.sendSMS = async (phoneNumber, message) => {
  const messageParams = {
    Message: message,
    PhoneNumber: phoneNumber,
  };

  try {
    const data = await sns.publish(messageParams).promise();
    console.log("SMS sent:", data);
    return data;
  } catch (err) {
    console.log("Error sending SMS:", err);
    throw err;
  }
};
