import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment-timezone";

const NoticeScreen = ({ id }) => {
  const { notices } = useSelector((state) => state.notices);

  const notice = notices
    .flatMap((innerArray) => innerArray)
    .find((obj) => obj._id === id);

  const details = notice ? JSON.parse(notice.details) : "";

  const renderFlag = (type) => {
    return (
      <View
        style={[
          styles.noticeTypeContainer,
          {
            borderColor: typeColorMapping[type].dotColor,
            backgroundColor: typeColorMapping[type].backgroundColor,
          },
        ]}
      >
        <View
          style={[
            styles.dotContainer,
            { backgroundColor: typeColorMapping[type].dotColor },
          ]}
        />
        <Text>{type}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {notice ? moment(notice.createdAt).format("MMMM D, YYYY") : null}
      </Text>
      <View style={styles.cardContainer}>
        <Text style={styles.subjectText}>{details.subject}</Text>
        <Text style={styles.detailsText}>{details.details}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {notice && renderFlag(notice.noticeType)}
          <Text style={styles.timeText}>
            {notice && moment(notice.createdAt).format("H:mm a")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NoticeScreen;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    marginTop: 40,
  },
  cardContainer: {
    marginTop: 20,
    borderRadius: 8,
    minWidth: 500,
    width: "60%",
  },
  date: {
    fontSize: 20,
    fontFamily: "InterSemiBold",
  },
  subjectText: {
    fontSize: 24,
    fontFamily: "InterRegular",
    flexWrap: "wrap",
    maxWidth: "85%",
  },
  timeText: {
    color: "black",
    fontSize: 16,
    fontFamily: "InterRegular",
  },
  detailsText: {
    fontSize: 16,
    // marginLeft: 10,
    fontFamily: "InterRegular",
    maxWidth: "95%",
    color: "black",
    marginVertical: 24,
  },
  noticeTypeContainer: {
    flexDirection: "row",
    borderWidth: 1,
    width: 100,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 80,
  },
  dotContainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
});
