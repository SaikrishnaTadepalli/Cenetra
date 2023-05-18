import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import moment from "moment-timezone";

import colors from "../src/constants/Colors";
import * as logDates from "../data/dates.json";
import CreateLogScreen from "./CreateLogScreen";
import { useRouter, useSearchParams } from "expo-router";
import LogScreen from "./LogScreen";
import { useDispatch, useSelector } from "react-redux";
import { getIsNewLogAdded, setIsNewLogAdded } from "../src/redux/logsSlice";

const DailyLogsScreen = ({ name, id }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { logs, fetchLogsPending } = state.log;
  const curDate = moment().format("DD MMMM YYYY");
  const [date, setDate] = useState("");
  const [isOldLogSelected, setIsOldLogSelected] = useState(false);
  const [logID, setLogID] = useState("");
  const isDisabled =
    getIsNewLogAdded(state) ||
    (logs.length > 0 &&
      logs[0] &&
      curDate === moment(logs[0].createdAt).format("DD MMMM YYYY"));

  const handleClick = () => {
    setDate(curDate);
    setIsOldLogSelected(false);
    dispatch(setIsNewLogAdded());
  };

  const onClickLog = (id) => {
    setIsOldLogSelected(true);
    setLogID(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}'s Logs</Text>
      <View>
        <TouchableOpacity
          style={
            isDisabled
              ? [styles.buttonContainer, styles.disabled]
              : styles.buttonContainer
          }
          onPress={handleClick}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>Add new log</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <ScrollView contentContainerStyle={styles.listView}>
          {fetchLogsPending ? (
            <Text>Retrieving data...</Text>
          ) : logs.length > 0 ? (
            logs.map((log, idx) => (
              <TouchableOpacity
                style={styles.cardContainer}
                key={`date-${idx}`}
                onPress={() => onClickLog(log._id)}
              >
                {log ? (
                  <Text>{moment(log.createdAt).format("DD MMMM YYYY")}</Text>
                ) : null}
              </TouchableOpacity>
            ))
          ) : (
            <View>
              <Text>No logs are available.</Text>
            </View>
          )}
        </ScrollView>
        <View style={{ flex: 1, marginLeft: "-30%" }}>
          {!isDisabled || isOldLogSelected ? (
            <LogScreen id={logID} />
          ) : date !== "" ? (
            <CreateLogScreen date={date} id={id} />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default DailyLogsScreen;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    width: "100%",
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
  },
  listView: {
    width: "30%",
  },
  cardContainer: {
    width: "100%",
    minHeight: 45,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 20,
    backgroundColor: colors.lightPurple,
    height: 40,
    width: 200,
    borderRadius: 10,
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    alignSelf: "center",
    color: colors.primaryText,
    fontWeight: 600,
  },
});
