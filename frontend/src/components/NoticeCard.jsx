import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useState } from "react";
import moment from "moment-timezone";

import colors from "../constants/Colors";
import typeColorMapping from "../../data/typeColorMapping";
import { useDispatch } from "react-redux";
import { markNoticeAsRead } from "../redux/noticesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoticeCard = ({ navigation, isRead, details, time, type, noticeID }) => {
  const [isNoticeRead, setIsNoticeRead] = useState(isRead);
  const parsedDetails = JSON.parse(details);
  const subject = parsedDetails.subject;
  const dispatch = useDispatch();

  const handleClick = async () => {
    const studentID = await AsyncStorage.getItem("studentID");
    navigation.navigate("NoticeInfo", {
      subject,
      details: parsedDetails.details,
      time: time,
      title: moment(time).format("DD MMMM YYYY"),
    });
    dispatch(
      markNoticeAsRead({
        studentID,
        noticeID: noticeID,
      })
    );
    setIsNoticeRead(true);
  };

  const cardColor = isNoticeRead ? colors.white : colors.lightGrey;
  const dotColor = typeColorMapping[type];

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { backgroundColor: cardColor }]}
      onPress={handleClick}
    >
      <View style={styles.headerRow}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "70%",
          }}
        >
          <View style={[styles.dotContainer, { backgroundColor: dotColor }]} />
          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            {subject}
          </Text>
        </View>
        <Text style={styles.timeText}>{moment(time).format("HH:mm")}</Text>
      </View>
      <View>
        <Text style={styles.subText} numberOfLines={1} ellipsizeMode="tail">
          {parsedDetails.details}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NoticeCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    minHeight: 55,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  dotContainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  titleText: {
    fontSize: 15,
    color: colors.primaryText,
    fontFamily: "InterMedium",
    width: "90%",
  },
  timeText: {
    color: colors.secondaryText,
    fontSize: 14,
    fontFamily: "InterMedium",
    alignSelf: "center",
    width: "30%",
    textAlign: "right",
  },
  subText: {
    color: colors.secondaryText,
    fontSize: 14,
    width: "90%",
    fontFamily: "InterMedium",
  },
});
