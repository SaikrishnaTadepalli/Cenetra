import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment-timezone";
import { useSearchParams } from "expo-router";

const LogScreen = ({ id }) => {
  const { logs } = useSelector((state) => state.log);
  // const { id } = useSearchParams();
  const log = logs.find((log) => (log ? log._id === id : null));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {log ? moment(log.createdAt).format("DD MMMM YYYY") : null}
      </Text>
      <Text>{log ? log.details : null}</Text>
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
});
