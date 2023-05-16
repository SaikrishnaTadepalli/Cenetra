import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./LoginScreen";
import Colors from "../src/constants/Colors";
import ClassListScreen from "./ClassListScreen";
import { Slot, Stack } from "expo-router";
import Header from "../src/components/Header";

const HomeLayout = () => {
  console.log("header");
  return (
    <>
      <Header />
      <Slot />
    </>
  );
};

export default HomeLayout;
