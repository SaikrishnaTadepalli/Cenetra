import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoticeCard from "../components/NoticeCard";

const NoticeInfoScreen = () => {
  return (
    <View style={styles.container}>
      <NoticeCard />
    </View>
  );
};

export default NoticeInfoScreen;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
});
