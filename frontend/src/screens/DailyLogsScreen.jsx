import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

import Picture from "../components/Picture";
import colors from "../constants/Colors";
import DailyLogsCard from "../components/DailyLogsCard";
import * as dailyLogs from "../../data/dailyLogs.json";

const DailyLogsScreen = ({ navigation }) => {
  const logs = dailyLogs.logs;
  //console.log(logs);
  const pictures = [];
  logs.map((log, idx) =>
    log.pictures.map((picture) => pictures.push({ idx: idx, uri: picture }))
  );
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
      {logs.map((log, idx) => (
        <View style={styles.logsContainer} key={`daily-logs-card-${idx}`}>
          <DailyLogsCard
            navigation={navigation}
            stars={log.rating}
            date={log.date}
            data={log.activities}
            pictures={log.pictures}
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
