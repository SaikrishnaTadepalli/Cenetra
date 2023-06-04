import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import Picture from "../components/Picture";
import colors from "../constants/Colors";
import DailyLogsCard from "../components/DailyLogsCard";
import * as dailyLogs from "../../data/dailyLogs.json";
import { useDispatch } from "react-redux";
import { fetchLogs, selectLogByID } from "../redux/dailyLogsSlice";
import { fetchStudentID } from "../redux/authSlice";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllMedia } from "../redux/mediaSlice";

const DailyLogsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = dailyLogs.logs[0].activities;
  const [refreshing, setRefreshing] = useState(false);
  const { logs, loading, error } = useSelector((state) => state.dailyLogs);
  const { allPictures } = useSelector((state) => state.media);

  const retrieveData = async () => {
    const studentID = await AsyncStorage.getItem("studentID");
    // console.log(studentID);
    dispatch(fetchLogs(studentID))
      .then((response) => {})
      .catch((error) => console.log("Error in Daily logs screen", error));
    dispatch(getAllMedia(studentID))
      .then((response) => {})
      .catch((error) =>
        console.log("Error in Daily logs screen getting media", error)
      );
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    retrieveData();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // console.log(loading);

  return (
    <>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error while retrieving data</Text>
          <TouchableOpacity
            onPress={retrieveData}
            style={{ alignSelf: "center", marginTop: 20 }}
          >
            <Text style={styles.reloadButtonText}>Reload Data</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {loading && !refreshing ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.indicator}
        />
      ) : (
        !error && (
          <ScrollView
            style={styles.mainContainer}
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text style={styles.titleText}>Daily Logs</Text>
            {allPictures.length > 0 ? (
              <TouchableOpacity
                style={styles.buttonText}
                onPress={() =>
                  navigation.navigate("Gallery", { pictures: allPictures })
                }
              >
                <Text style={styles.buttonText}>See All</Text>
              </TouchableOpacity>
            ) : null}
            <ScrollView horizontal={true} style={styles.imagesContainer}>
              {allPictures.map((picture, idx) =>
                idx < 10 ? (
                  <View key={`picture-${idx}`} style={styles.imageContainer}>
                    <Picture navigation={navigation} uri={picture} />
                  </View>
                ) : null
              )}
            </ScrollView>
            {logs.map((log, idx) => (
              <View style={styles.logsContainer} key={`daily-logs-card-${idx}`}>
                <DailyLogsCard
                  navigation={navigation}
                  date={log.createdAt}
                  data={log.details}
                  logID={log._id}
                  rating={log.rating}
                />
              </View>
            ))}
          </ScrollView>
        )
      )}
    </>
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
  indicator: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 999,
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  errorText: {
    color: colors.red,
    fontFamily: "InterMedium",
    fontSize: 20,
  },
  reloadButtonText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "InterMedium",
  },
});
