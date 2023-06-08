import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoticeInfoCard from "../components/NoticeInfoCard";

const NoticeInfoScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <NoticeInfoCard
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
