import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import moment from "moment-timezone";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../src/constants/Colors";
import CreateLogScreen from "./CreateLogScreen";
import { useRouter } from "expo-router";
import LogScreen from "./LogScreen";
import { useDispatch, useSelector } from "react-redux";
import { getIsNewLogAdded, setIsNewLogAdded } from "../src/redux/logsSlice";

const LogsScreen = ({
  name,
  studentID,
  setIsStudentNameSelected,
  setIsOldLogSelected,
  setDate,
  setLogID,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state) => state);
  const { logs, fetchLogsPending } = state.log;
  const curDate = moment().format("DD MMMM YYYY");
  //const [date, setDate] = useState("");
  //const [isOldLogSelected, setIsOldLogSelected] = useState(false);
  // const [logID, setLogID] = useState("");
  const isDisabled =
    logs.length > 0 &&
    logs[0] &&
    curDate === moment(logs[0].createdAt).format("DD MMMM YYYY");

  const handleClick = () => {
    setDate(curDate);
    setIsOldLogSelected(false);
    dispatch(setIsNewLogAdded(true));
    setLogID("");
    setIsStudentNameSelected(false);
  };

  const onClickLog = (logID) => {
    setIsOldLogSelected(true);
    setLogID(logID);
    setIsStudentNameSelected(false);
  };

  const onPressEdit = (date) => {
    console.log(date);
    setIsOldLogSelected(false);
    setDate(date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}'s Logs</Text>
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
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.dateText}>
                      {moment(log.createdAt).format("DD MMMM YYYY")}
                    </Text>
                    {/* {moment(log.createdAt).format("DD MMMM YYYY") ===
                      curDate && (
                      <TouchableOpacity
                        onPress={() => onPressEdit(log.createdAt)}
                      >
                        <MaterialCommunityIcons
                          name="pencil-outline"
                          size={20}
                          color="#024552"
                        />
                      </TouchableOpacity>
                    )} */}
                  </View>
                ) : null}
              </TouchableOpacity>
            ))
          ) : (
            <View>
              <Text>No logs are available.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default LogsScreen;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    width: "100%",
  },
  header: {
    fontSize: 20,
    fontFamily: "InterSemiBold",
    marginBottom: 20,
  },
  dateText: {
    fontFamily: "InterMedium",
    fontSize: 14,
    marginRight: 100,
  },
  listView: {
    paddingBottom: 60,
  },
  cardContainer: {
    width: 250,
    minHeight: 50,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 20,
    backgroundColor: "#99B8BE99",
    height: 40,
    width: 132,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    alignSelf: "center",
    color: "#024552",
    fontWeight: 600,
  },
});
