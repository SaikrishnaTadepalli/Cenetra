import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NoticeCard from "../components/NoticeCard";

const NoticeInfoScreen = ({ route }) => {
  console.log(route.params.time);
  return (
    <View style={styles.container}>
      <NoticeCard
        title={route.params.title}
        time={route.params.time}
        text={route.params.subText}
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
