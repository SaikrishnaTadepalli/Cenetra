import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

import LogCard from "../components/LogCard";
import Picture from "../components/Picture";
import colors from "../constants/Colors";

const LogScreen = ({ navigation }) => {
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

  const logs = [
    {
      title: "Today",
      color: "red",
      data: [
        { id: "1", title: "Title", time: "Time", date: "Created on..." },
        { id: "2", title: "Title", time: "Time", date: "Created on..." },
        { id: "3", title: "Title", time: "Time", date: "Created on..." },
        { id: "4", title: "Title", time: "Time", date: "Created on..." },
      ],
    },
    {
      title: "Yesterday",
      color: "pink",
      data: [
        { id: "5", title: "Title", time: "Time", date: "Created on..." },
        { id: "6", title: "Title", time: "Time", date: "Created on..." },
        { id: "7", title: "Title", time: "Time", date: "Created on..." },
        { id: "8", title: "Title", time: "Time", date: "Created on..." },
        { id: "9", title: "Title", time: "Time", date: "Created on..." },
      ],
    },
    {
      title: "October 2, 2022",
      color: "blue",
      data: [
        { id: "10", title: "Title", time: "Time", date: "Created on..." },
        { id: "11", title: "Title", time: "Time", date: "Created on..." },
        { id: "12", title: "Title", time: "Time", date: "Created on..." },
        { id: "13", title: "Title", time: "Time", date: "Created on..." },
        { id: "14", title: "Title", time: "Time", date: "Created on..." },
        { id: "15", title: "Title", time: "Time", date: "Created on..." },
        { id: "16", title: "Title", time: "Time", date: "Created on..." },
      ],
    },
    {
      title: "April 16, 2022",
      color: "purple",
      data: [
        { id: "17", title: "Title", time: "Time", date: "Created on..." },
        { id: "18", title: "Title", time: "Time", date: "Created on..." },
        { id: "19", title: "Title", time: "Time", date: "Created on..." },
        { id: "20", title: "Title", time: "Time", date: "Created on..." },
      ],
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled={true}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 32 }}
    >
      <View style={{ alignSelf: "flex-end" }}>
        <TouchableOpacity
          style={styles.buttonText}
          onPress={() => navigation.navigate("Gallery")}
        >
          <Text style={styles.buttonText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} style={styles.imagesContainer}>
        {pictures.map((picture, idx) =>
          idx < 10 ? (
            <View key={picture.id} style={styles.imageContainer}>
              <Picture isGallery={false} uri={picture.uri} />
            </View>
          ) : null
        )}
      </ScrollView>
      {logs.map((log) => (
        <View key={log.id}>
          <Text style={[styles.sectionHeader, { color: log.color }]}>
            {log.title}
          </Text>
          <View style={[styles.divider, { borderColor: log.color }]} />
          {log.data.map((data) => (
            <View style={styles.logsContainer}>
              <LogCard sectionHeaderColor={log.color} header={data.title} />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default LogScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  sectionHeader: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "InterSemiBold",
    marginBottom: 8,
    marginTop: 10,
  },
  divider: {
    borderWidth: 0.5,
    width: 390,
    marginBottom: 25,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 12,
    fontFamily: "InterMedium",
    marginRight: 16,
    marginVertical: 8,
  },
  imagesContainer: {
    marginLeft: 20,
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  logsContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
});
