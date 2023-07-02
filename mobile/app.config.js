module.exports = {
  expo: {
    name: "Cenetra",
    slug: "cenetra",
    description: "Mobile first daycare application",
    version: "1.0.3",
    orientation: "portrait",
    icon: "./assets/images/AppIcon.png",
    userInterfaceStyle: "light",
    extra: {
      apiUrl: process.env.TEST_BACKEND_URI,
      //apiUrl2: "http://18.206.57.12:8080/graphql",
      eas: {
        projectId: "7cb0273a-ca8a-494b-8af6-0fffb36709bf",
      },
    },
    splash: {
      image: "./assets/images/SplashScreen.png",
      resizeMode: "contain",
      backgroundColor: "#EAECFF",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.cenetra.cenetra",
      buildNumber: "4",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
};

// app.config.js

// import { ConfigContext } from "@expo/config";

// export default ({ config }) => {
//   return {
//     ...config,
//     // Add or modify the necessary fields for iOS release
//     ios: {
//       // iOS-specific configuration options
//       bundleIdentifier: "com.cenetra.cenetra",
//       buildNumber: "1.0.0",
//       // Add any other iOS-specific configuration options you require
//     },
//     // Add any extra fields you need
//   };
// };
