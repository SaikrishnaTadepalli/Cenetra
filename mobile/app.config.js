module.exports = {
  expo: {
    name: "Curiouss Kids",
    slug: "cenetra",
    description: "Mobile first daycare application",
    version: "1.2.2",
    // current android: 1.0.9
    // current ios 1.2.2
    orientation: "portrait",
    icon: "./assets/images/SchoolLogo.png",
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
      buildNumber: "24",
    },
    android: {
      package: "com.cenetra.cenetra",
      versionCode: 10,
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
