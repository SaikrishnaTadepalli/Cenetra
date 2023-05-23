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
import { useSelector } from "react-redux";

const DailyLogsScreen = ({ name, id }) => {
  const dates = logDates.dates;
  const { logs } = useSelector((state) => state.log);
  const curDate = moment().format("DD MMMM YYYY");
  const [date, setDate] = useState("");
  const [isOldLogSelected, setIsOldLogSelected] = useState(false);
  const [disabled, setDisabled] = useState(
    moment(dates[0]).format("DD MMMM YYYY") === curDate
  );
  const handleClick = () => {
    setDate(curDate);
    setDisabled(!disabled);
    setIsOldLogSelected(false);
  };

  const onClickLog = () => {
    setIsOldLogSelected(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}'s Logs</Text>
      <View>
        <TouchableOpacity
          style={
            disabled
              ? [styles.buttonContainer, styles.disabled]
              : styles.buttonContainer
          }
          onPress={handleClick}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>Add new log</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <ScrollView contentContainerStyle={styles.listView}>
          {logs.length > 0 ? (
            logs.map((log, idx) => (
              <TouchableOpacity
                style={styles.cardContainer}
                key={`date-${idx}`}
                onPress={onClickLog}
              >
                <Text>{moment(log.createdAt).format("DD MMMM YYYY")}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View>
              <Text>No logs are available.</Text>
            </View>
          )}
        </ScrollView>
        <View style={{ flex: 1, marginLeft: "-30%" }}>
          {isOldLogSelected ? (
            <LogScreen />
          ) : date !== "" ? (
            <CreateLogScreen date={date} />
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
