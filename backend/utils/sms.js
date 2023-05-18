const aws = require("aws-sdk");
const config = require("./config");

// Create an instance of AWS.SNS
const sns = new aws.SNS({
  region: config.SNS_REGION,
  accessKeyId: config.SNS_ACCESS_KEY_ID,
  secretAccessKey: config.SNS_SECRET_ACCESS_KEY,
});

const sendSMS = async (phoneNumber, message) => {
  const messageParams = {
    Message: message,
    PhoneNumber: "+14372282216",
  };

  try {
    console.log("Sending SMS: " + phoneNumber + " - " + message);
    const data = await sns.publish(messageParams).promise();
    console.log("SMS sent:", data);
    return data;
  } catch (err) {
    console.log("Error sending SMS:", err);
    throw err;
  }
};

module.exports = {
  sendSMS,
};
