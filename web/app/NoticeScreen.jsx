import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment-timezone";

const NoticeScreen = ({ id }) => {
  const { notices } = useSelector((state) => state.notices);
  const notice = notices.find((notice) => (notice ? notice._id === id : null));
  const details = notice ? JSON.parse(notice.details) : "";

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {notice ? moment(notice.createdAt).format("DD MMMM YYYY") : null}
      </Text>
      <View style={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{details.subject}</Text>
          <Text style={styles.timeText}>
            {moment(notice.createdAt).format("HH:mm")}
          </Text>
        </View>
        <Text style={styles.noticeText}>{details.details}</Text>
      </View>
    </View>
  );
};

export default NoticeScreen;

const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
  cardContainer: {
    marginTop: 20,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingBottom: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 30,
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
    fontWeight: 600,
    flexWrap: "wrap",
    maxWidth: "85%",
  },
  timeText: {
    color: "black",
    fontSize: 14,
    fontWeight: 400,
    marginTop: 1,
  },
  noticeText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 400,
    maxWidth: "95%",
    color: "black",
  },
});
