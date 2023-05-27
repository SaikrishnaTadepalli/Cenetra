import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoticeCard from "../components/NoticeCard";

const NoticeInfoScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <NoticeCard
        subject={route.params.subject}
        details={route.params.details}
        time={route.params.time}
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
