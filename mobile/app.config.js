module.exports = {
  expo: {
    name: "Cenetra",
    slug: "cenetra",
    description: "Mobile first daycare application",
    version: "1.1.1",
    orientation: "portrait",
    icon: "./assets/images/AppIcon.png",
    userInterfaceStyle: "light",
    extra: {
      eas: {
        projectId: "7cb0273a-ca8a-494b-8af6-0fffb36709bf",
      },
    },
    splash: {
      image: "./assets/images/LogoSplashScreen.png",
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
      buildNumber: "12",
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
