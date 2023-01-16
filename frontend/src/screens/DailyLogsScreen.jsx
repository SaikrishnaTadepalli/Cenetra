import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

import Card from "../components/Card";
import Picture from "../components/Picture";
import colors from "../constants/Colors";

const DailyLogsScreen = ({ navigation }) => {
  const logs = [
    { id: "1", title: "Title", time: "Time", date: "Created on..." },
    { id: "2", title: "Title", time: "Time", date: "Created on..." },
    { id: "3", title: "Title", time: "Time", date: "Created on..." },
    { id: "4", title: "Title", time: "Time", date: "Created on..." },
    { id: "5", title: "Title", time: "Time", date: "Created on..." },
    { id: "6", title: "Title", time: "Time", date: "Created on..." },
    { id: "7", title: "Title", time: "Time", date: "Created on..." },
    { id: "8", title: "Title", time: "Time", date: "Created on..." },
    { id: "9", title: "Title", time: "Time", date: "Created on..." },
    { id: "10", title: "Title", time: "Time", date: "Created on..." },
    { id: "11", title: "Title", time: "Time", date: "Created on..." },
    { id: "12", title: "Title", time: "Time", date: "Created on..." },
    { id: "13", title: "Title", time: "Time", date: "Created on..." },
    { id: "14", title: "Title", time: "Time", date: "Created on..." },
    { id: "15", title: "Title", time: "Time", date: "Created on..." },
    { id: "16", title: "Title", time: "Time", date: "Created on..." },
    { id: "17", title: "Title", time: "Time", date: "Created on..." },
    { id: "18", title: "Title", time: "Time", date: "Created on..." },
    { id: "19", title: "Title", time: "Time", date: "Created on..." },
    { id: "20", title: "Title", time: "Time", date: "Created on..." },
  ];
  const pictures = [
    { id: "1", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "2", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "3", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "4", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "5", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "6", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "7", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "8", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "9", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "10", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "11", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "12", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "13", uri: "https://reactnative.dev/img/tiny_logo.png" },
  ];
  return (
    <ScrollView style={styles.mainContainer} nestedScrollEnabled={true}>
      <Text style={styles.titleText}>Daily Logs</Text>
      <TouchableOpacity
        style={styles.buttonText}
        onPress={() => navigation.navigate("Gallery")}
      >
        <Text style={styles.buttonText}>See All</Text>
      </TouchableOpacity>
      <ScrollView horizontal={true} style={styles.imagesContainer}>
        {pictures.map((picture, idx) =>
          idx < 10 ? (
            <View key={picture.id} style={styles.imageContainer}>
              <Picture isGallery={false} />
            </View>
          ) : null
        )}
      </ScrollView>
      {logs.map((log) => (
        <View style={styles.logsContainer} key={log.id}>
          <Card isLog={true} navigateTo={"Log"} navigation={navigation} />
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
  },
  titleText: {
    fontSize: 24,
    textAlign: "left",
    marginBottom: 8,
    marginLeft: 26,
    marginTop: 20,
    fontFamily: "InterMedium",
    color: colors.black,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 12,
    fontFamily: "InterMedium",
    textAlign: "right",
    marginRight: 16,
    marginBottom: 8,
  },
  imagesContainer: {
    marginBottom: 18,
    marginLeft: 20,
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
