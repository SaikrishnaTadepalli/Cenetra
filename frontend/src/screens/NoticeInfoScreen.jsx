import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoticeCard from "../components/NoticeCard";

const NoticeInfoScreen = () => {
  return (
    <View style={styles.container}>
      <NoticeCard
        title="Title"
        time="Time"
        text="There is a PTA meeting going to be held on 26th June at 5pm."
      />
    </View>
  );
};

export default NoticeInfoScreen;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
});
