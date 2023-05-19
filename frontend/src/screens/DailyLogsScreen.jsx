import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import Picture from "../components/Picture";
import colors from "../constants/Colors";
import DailyLogsCard from "../components/DailyLogsCard";
import * as dailyLogs from "../../data/dailyLogs.json";
import { useDispatch } from "react-redux";
import { fetchLogs } from "../redux/dailyLogsSlice";
import { fetchStudentID } from "../redux/authSlice";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DailyLogsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [studentID, setStudentID] = useState("");
  const { pending, logs } = useSelector((state) => state.dailyLogs);
  //var logs = dailyLogs.logs;
  //console.log(logs);
  const pictures = [];
  // logs.map((log, idx) =>
  //   log.pictures.map((picture) => pictures.push({ idx: idx, uri: picture }))
  // );

  useEffect(() => {
    console.log("useeffect");
    const retrieveData = async () => {
      const data = await AsyncStorage.getItem("studentID");
      dispatch(fetchLogs(data))
        .then((response) => console.log(response))
        .catch((error) => console.log("Error in Daily logs screen", error));
    };
    retrieveData();
  }, []);
  console.log(logs.length);
  return (
    <ScrollView style={styles.mainContainer} nestedScrollEnabled={true}>
      <Text style={styles.titleText}>Daily Logs</Text>
      <TouchableOpacity
        style={styles.buttonText}
        onPress={() => navigation.navigate("Gallery", { pictures: pictures })}
      >
        <Text style={styles.buttonText}>See All</Text>
      </TouchableOpacity>
      <ScrollView horizontal={true} style={styles.imagesContainer}>
        {pictures.map((picture, idx) =>
          idx < 10 ? (
            <View key={`picture-${idx}`} style={styles.imageContainer}>
              <Picture navigation={navigation} uri={picture.uri} />
            </View>
          ) : null
        )}
      </ScrollView>
      {console.log("logs", logs)}
      {logs.map((log, idx) => (
        <View style={styles.logsContainer} key={`daily-logs-card-${idx}`}>
          <DailyLogsCard
            navigation={navigation}
            date={log.createdAt}
            data={log.details}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default DailyLogsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    paddingBottom: 32,
    width: "100%",
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    textAlign: "left",
    marginBottom: 8,
    marginTop: 20,
    fontFamily: "InterMedium",
    color: colors.black,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 12,
    fontFamily: "InterMedium",
    textAlign: "right",
    marginBottom: 8,
  },
  imagesContainer: {
    width: "100%",
    marginBottom: 18,
  },
  imageContainer: {
    marginRight: 10,
  },
  logsContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 12,
  },
});
