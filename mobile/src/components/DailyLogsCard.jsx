import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import moment from "moment-timezone";

import colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { fetchLogs, selectLogByID } from "../redux/dailyLogsSlice";
import { useSelector } from "react-redux";

const DailyLogsCard = ({ navigation, data, date, logID, rating }) => {
  // console.log("dailylogscard", date);
  const pictures = [];
  const { logs } = useSelector((state) => state.dailyLogs);

  const findLogById = (id) => {
    let foundLog = null;

    logs.forEach((segment) => {
      const log = segment.data.find((item) => item._id === id);
      if (log) {
        foundLog = log;
      }
    });

    return foundLog;
  };

  const handleClick = () => {
    const curLog = findLogById(logID);
    //console.log(curLog);
    navigation.navigate("Log", {
      data: data,
      pictures: pictures,
      title: moment(curLog.createdAt).utc().format("MMMM D, YYYY"),
      date: curLog.createdAt,
    });
  };

  const renderIcon = (name, idx) => (
    <Ionicons
      key={`${name}-${idx}`}
      name={name}
      color={colors.yellow}
      size={16}
      style={{ marginRight: 2 }}
    />
  );

  const renderIcons = (num, name) =>
    [...Array(num).keys()].map((idx) => renderIcon(name, idx));

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleClick}>
      <View style={styles.headerRow}>
        <Text style={styles.titleText}>
          {moment(date).utc().format("MMMM D, YYYY")}
        </Text>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {renderIcons(rating, "star")}
          {renderIcons(5 - rating, "star-outline")}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DailyLogsCard;

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
    backgroundColor: "white",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 15,
    color: colors.primaryText,
    fontFamily: "InterMedium",
  },
});
