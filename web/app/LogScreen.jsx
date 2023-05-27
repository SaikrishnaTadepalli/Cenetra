import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment-timezone";
import { useSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const LogScreen = ({ id }) => {
  const { logs } = useSelector((state) => state.log);
  // const { id } = useSearchParams();
  const log = logs.find((log) => (log ? log._id === id : null));
  const parsedLog = JSON.parse(log.details);
  const rating = parseInt(log.rating);

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {log ? moment(log.createdAt).format("DD MMMM YYYY") : null}
      </Text>
      <Text>Rating</Text>
      <View
        style={{ alignItems: "center", flexDirection: "row", marginBottom: 20 }}
      >
        {renderIcons(5, "star")}
        {renderIcons(0, "star-outline")}
      </View>
      {parsedLog.data.map((log, idx) => {
        return (
          <View>
            <Text style={styles.headerText}>{log.name}</Text>
            <View style={styles.cardContainer} key={`log-${idx}`}>
              <Text style={styles.noticeText}>{log.value}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default LogScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    width: "80%",
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 30,
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
});
