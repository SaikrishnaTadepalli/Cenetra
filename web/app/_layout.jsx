import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./LoginScreen";
import Colors from "../src/constants/Colors";
import ClassListScreen from "./ClassListScreen";
import { Slot, Stack } from "expo-router";
import Header from "../src/components/Header";
import { Provider } from "react-redux";
import { persistor, store } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const HomeLayout = () => {
  console.log("header");
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Slot />
        </PersistGate>
      </Provider>
    </>
  );
};

export default HomeLayout;
