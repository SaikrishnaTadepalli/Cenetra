import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment-timezone";

import colors from "../constants/Colors";

const NoticeCard = ({ subject, details, time }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{subject}</Text>
        <Text style={styles.timeText}>{moment(time).format("HH:mm")}</Text>
      </View>
      <Text style={styles.noticeText}>{details}</Text>
    </View>
  );
};

export default NoticeCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    width: "100%",
    borderRadius: 8,
    paddingBottom: 20,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "InterMedium",
    flexWrap: "wrap",
    maxWidth: "85%",
  },
  timeText: {
    color: colors.secondaryText,
    fontSize: 14,
    fontFamily: "InterMedium",
    marginTop: 1,
  },
  noticeText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "InterRegular",
    maxWidth: "95%",
    color: colors.primaryText,
  },
});
