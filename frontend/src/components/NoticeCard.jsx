import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useState } from "react";
import moment from "moment-timezone";
import { Ionicons } from "@expo/vector-icons";

import colors from "../constants/Colors";
import typeColorMapping from "../../data/typeColorMapping";
import { useDispatch } from "react-redux";
import { markNoticeAsRead } from "../redux/noticesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoticeCard = ({ navigation, isRead, details, date, type, noticeID }) => {
  const [isNoticeRead, setIsNoticeRead] = useState(isRead);
  const [isExpanded, setIsExpanded] = useState({});
  const parsedDetails = JSON.parse(details);
  const subject = parsedDetails.subject;
  const dispatch = useDispatch();

  const handleExpandNotice = async (buttonId) => {
    const studentID = await AsyncStorage.getItem("studentID");
    dispatch(
      markNoticeAsRead({
        studentID,
        noticeID,
      })
    );
    setIsNoticeRead(true);
    setIsExpanded((prevState) => ({
      ...prevState,
      [buttonId]: !prevState[buttonId],
    }));
  };

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
    <>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleExpandNotice(date)}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            justifyContent: "space-between",
          }}
        >
          {!isNoticeRead ? (
            <View style={[styles.dotContainer, { backgroundColor: "blue" }]} />
          ) : null}
          <Text
            style={styles.subject}
            numberOfLines={isExpanded[date] ? null : 1}
            ellipsizeMode={isExpanded[date] ? null : "tail"}
          >
            {subject}
          </Text>
          <Ionicons
            name={
              isExpanded[date]
                ? "chevron-up-circle-outline"
                : "chevron-down-circle-outline"
            }
            size={24}
            color="black"
          />
        </View>
        {isExpanded[date] && (
          <>
            <Text style={styles.detailsText}>{parsedDetails.details}</Text>
            {renderFlag(type)}
          </>
        )}
        <View style={styles.sectionHeader}>
          <Text style={styles.date}>
            {moment(date).format("MMMM DD, YYYY   HH:mm a")}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default NoticeCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    minHeight: 55,
    borderColor: "#A0B2AF",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "rgba(217, 217, 217, 0.2)",
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
  subject: {
    fontSize: 16,
    color: "#23342C",
    fontFamily: "InterSemiBold",
    width: "90%",
  },
  detailsText: {
    fontSize: 15,
    color: "#23342C",
    fontFamily: "InterMedium",
    width: "90%",
    marginBottom: 10,
  },
  timeText: {
    color: "#719792",
    fontSize: 14,
    fontFamily: "InterMedium",
    alignSelf: "center",
    width: "30%",
    textAlign: "right",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: 320,
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
    marginBottom: 10,
  },
});
