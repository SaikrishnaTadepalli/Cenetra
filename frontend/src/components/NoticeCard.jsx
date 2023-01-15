import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NoticeCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Title</Text>
        <Text style={styles.timeText}>Time</Text>
      </View>
      <Text style={styles.noticeText}>
        There is a PTA meeting going to be held on 26th June at 5pm.
      </Text>
    </View>
  );
};

export default NoticeCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    borderColor: "#CCCCCC",
    borderWidth: 2,
    width: 390,
    borderRadius: 8,
    paddingBottom: 20,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
  },
  timeText: {
    color: "#A2A2A2",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    alignSelf: "center",
    marginLeft: 10,
    marginTop: 1,
  },
  noticeText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
