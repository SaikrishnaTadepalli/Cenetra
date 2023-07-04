const { Expo } = require("expo-server-sdk");

const { EXPO_ACCESS_TOKEN } = require("./config");

const expo = new Expo({ accessToken: EXPO_ACCESS_TOKEN });

const sendExpoPushNotification = async (pushToken, title, body) => {
  try {
    if (!Expo.isExpoPushToken(pushToken)) {
      throw new Error("Invalid push token");
    }

    const message = {
      to: pushToken,
      sound: "default",
      title,
      body,
      data: { someDataKey: "someDataValue" }, // You can add custom data here
    };

    const receipt = await expo.sendPushNotificationsAsync([message]);
    console.log("Notification sent successfully:", receipt);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  sendExpoPushNotification,
};
