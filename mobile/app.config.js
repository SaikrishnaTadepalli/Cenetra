module.exports = {
  expo: {
    name: "Cenetra",
    slug: "cenetra",
    description: "Mobile first daycare application",
    version: "1.0.3",
    orientation: "portrait",
    icon: "./assets/images/SchoolAppIcon2.png",
    userInterfaceStyle: "light",
    extra: {
      eas: {
        projectId: "7cb0273a-ca8a-494b-8af6-0fffb36709bf",
      },
    },
    splash: {
      image: "./assets/images/LogoSplashScreen.png",
      resizeMode: "contain",
      backgroundColor: "#23342C",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.cenetra.cenetra",
      buildNumber: "16",
    },
    android: {
      package: "com.cenetra.cenetra",
      versionCode: 4,
      splash: {
        image: "./assets/images/LogoSplashScreen.png",
        resizeMode: "contain",
        backgroundColor: "#23342C",
      },
      // adaptiveIcon: {
      //   foregroundImage: "./assets/adaptive-icon.png",
      //   backgroundColor: "#FFFFFF",
      // },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
};
