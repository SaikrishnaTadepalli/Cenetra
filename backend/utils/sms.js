// const aws = require("aws-sdk");
// const config = require("./config");

// // Create an instance of AWS.SNS
// const sns = new aws.SNS({
//   region: config.SNS_REGION,
//   accessKeyId: config.SNS_ACCESS_KEY_ID,
//   secretAccessKey: config.SNS_SECRET_ACCESS_KEY,
// });

// const sendSMS = async (phoneNumber, message) => {
//   const messageParams = {
//     Message: message,
//     PhoneNumber: phoneNumber,
//   };

//   try {
//     console.log("Sending SMS: " + phoneNumber + " - " + message);
//     const data = await sns.publish(messageParams).promise();
//     console.log("SMS sent:", data);
//     return data;
//   } catch (err) {
//     console.log("Error sending SMS:", err);
//     throw err;
//   }
// };

// const {
//   TWILIO_AUTH_TOKEN,
//   TWILIO_ACCOUNT_SID,
//   TWILIO_NUMBER,
// } = require("./config");

// const sendSMS = async (phoneNumber, message) => {
//   const accountSid = TWILIO_ACCOUNT_SID;
//   const authToken = TWILIO_AUTH_TOKEN;
//   const client = require("twilio")(accountSid, authToken);

//   client.messages
//     .create({ body: message, from: TWILIO_NUMBER, to: phoneNumber })
//     .then((message) => console.log("SMS sent:", message.sid))
//     .catch((error) => console.error("Error sending SMS:", error));
// };

// module.exports = {
//   sendSMS,
// };

const {
  TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID,
  TWILIO_NUMBER,
} = require("./config");
const twilio = require("twilio");

const sendSMS = async (phoneNumber, message) => {
  try {
    const accountSid = TWILIO_ACCOUNT_SID;
    const authToken = TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const sentMessage = await client.messages.create({
      body: message,
      from: TWILIO_NUMBER,
      to: phoneNumber,
    });

    console.log("SMS sent:", sentMessage.sid);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  sendSMS,
};
