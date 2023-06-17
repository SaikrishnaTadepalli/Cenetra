import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";

import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { MenuProvider } from "react-native-popup-menu";
import { Alert } from "react-native";

import Navigation from "./src/navigation";
import { store } from "./src/redux/store";
import useCachedResources from "./src/hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources(); // understand this
  const navigationRef = React.createRef();
  const fontsLoaded = useCachedResources();

  /*
    To Understand :
    - Menu Provider
    - RootSiblingParent
    - SafeAreaProvider
    - StatusBar
  */

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <MenuProvider customStyles={styles2.menuContext}>
        <Provider store={store}>
          <RootSiblingParent>
            <SafeAreaProvider>
              <Navigation ref={navigationRef} />
              <StatusBar style="dark" />
            </SafeAreaProvider>
          </RootSiblingParent>
        </Provider>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const styles2 = {
  menuContext: {
    backdrop: {
      backgroundColor: "#000",
      opacity: 0.4,
    },
  },
};
