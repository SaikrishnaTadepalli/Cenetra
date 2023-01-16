import { StyleSheet, Text, View } from "react-native";
import React from "react";

import colors from "../constants/Colors";

const NoticeCard = ({ title, time, text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <Text style={styles.noticeText}>{text}</Text>
    </View>
  );
};

export default NoticeCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderColor: colors.lightGrey,
    borderWidth: 2,
    width: "100%",
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
    fontFamily: "InterMedium",
  },
  timeText: {
    color: colors.secondaryText,
    fontSize: 14,
    fontFamily: "InterMedium",
    textAlign: "center",
    alignSelf: "center",
    marginLeft: 10,
    marginTop: 1,
  },
  noticeText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "InterRegular",
    color: colors.primaryText,
  },
});
