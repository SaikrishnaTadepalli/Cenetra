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
    { id: "1", date: "October 20, 2022", rate: "5/5" },
    { id: "2", date: "October 12, 2022", rate: "4/5" },
    { id: "3", date: "October 11, 2022", rate: "4/5" },
    { id: "4", date: "October 10, 2022", rate: "4/5" },
    { id: "5", date: "October 9, 2022", rate: "4/5" },
    { id: "6", date: "October 8, 2022", rate: "4/5" },
    { id: "7", date: "October 7, 2022", rate: "4/5" },
    { id: "8", date: "October 6, 2022", rate: "4/5" },
    { id: "9", date: "October 5, 2022", rate: "4/5" },
    { id: "10", rate: "4/5", date: "Created on..." },
    { id: "11", rate: "4/5", date: "Created on..." },
    { id: "12", rate: "4/5", date: "Created on..." },
    { id: "13", rate: "4/5", date: "Created on..." },
    { id: "14", rate: "4/5", date: "Created on..." },
    { id: "15", rate: "4/5", date: "Created on..." },
    { id: "16", rate: "4/5", date: "Created on..." },
    { id: "17", rate: "4/5", date: "Created on..." },
  ];

  const pictures = [
    {
      id: "1",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "2",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "3",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "4",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "5",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "6",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "7",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
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
              <Picture isGallery={false} uri={picture.uri} />
            </View>
          ) : null
        )}
      </ScrollView>
      {logs.map((log) => (
        <View style={styles.logsContainer} key={log.id}>
          <Card
            isLog={true}
            navigateTo={"Log"}
            navigation={navigation}
            title={log.date}
            time={log.rate}
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
