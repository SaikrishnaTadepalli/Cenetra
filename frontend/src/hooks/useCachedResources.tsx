import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          InterBlack: require("../../assets/fonts/Inter-Black.ttf"),
          InterBold: require("../../assets/fonts/Inter-Bold.ttf"),
          InterExtraBold: require("../../assets/fonts/Inter-ExtraBold.ttf"),
          InterLight: require("../../assets/fonts/Inter-Light.ttf"),
          InterMedium: require("../../assets/fonts/Inter-Medium.ttf"),
          InterRegular: require("../../assets/fonts/Inter-Regular.ttf"),
          InterSemiBold: require("../../assets/fonts/Inter-SemiBold.ttf"),
          InterThin: require("../../assets/fonts/Inter-Thin.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
