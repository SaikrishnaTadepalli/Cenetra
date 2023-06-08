import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import { Ionicons } from "@expo/vector-icons";

import colors from "../src/constants/Colors";
import { setIsNewLogAdded } from "../src/redux/logsSlice";

const LogScreen = ({ logID, setIsOldLogSelected, setDate, curDate }) => {
  const { logs } = useSelector((state) => state.log);
  const log = logs.find((log) => (log ? log._id === logID : null));
  const parsedLog = log ? JSON.parse(log.details) : null;
  const rating = log ? parseInt(log.rating) : 0;
  const date = log ? moment(log.createdAt).format("DD MMMM YYYY") : "";
  const dispatch = useDispatch();

  const renderIcon = (name, idx) => (
    <Ionicons
      key={`${name}-${idx}`}
      name={name}
      color="#FAC748"
      size={16}
      style={{ marginRight: 2 }}
    />
  );
  const renderIcons = (num, name) =>
    [...Array(num).keys()].map((idx) => renderIcon(name, idx));

  const onPressEdit = () => {
    setIsOldLogSelected(false);
    setDate(date);
    dispatch(setIsNewLogAdded(true));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={styles.header}>{date}</Text>
        {date === curDate ? (
          <TouchableOpacity onPress={onPressEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        {rating > 0 ? (
          <>
            <Text style={{ marginRight: 10 }}>Rating</Text>
            {renderIcons(rating, "star")}
            {renderIcons(5 - rating, "star-outline")}{" "}
          </>
        ) : null}
      </View>
      {parsedLog
        ? parsedLog.activities.map((log, index) => (
            <View key={`log-title-${index}`}>
              <Text style={styles.sectionHeader}>{log.sectionHeader}</Text>
              {log.sectionActivities.map((data, idx) => (
                <View key={`log-info-${idx}`}>
                  <Text style={styles.headerText}>{data.title}</Text>
                  <View style={styles.cardContainer} key={`log-${idx}`}>
                    <Text style={styles.noticeText}>{data.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))
        : null}
    </View>
  );
};

export default LogScreen;

const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
  cardContainer: {
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    borderRadius: 8,
    paddingBottom: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 20,
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 400,
    flexWrap: "wrap",
    maxWidth: "85%",
  },
  noticeText: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 400,
    maxWidth: "95%",
    color: "black",
  },
  editButtonText: {
    color: colors.buttonText,
    fontSize: 15,
    fontWeight: 600,
    textAlign: "right",
  },
});
