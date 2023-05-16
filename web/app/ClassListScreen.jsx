import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";

import * as classList from "../data/names.json";
import colors from "../src/constants/Colors";
import DailyLogsScreen from "./DailyLogs";

const ClassListScreen = () => {
  const names = classList.names;
  const [name, setName] = useState(names[0]);
  const router = useRouter();

  const handleClick = (name) => {
    //router.push(`/${name}`);
    setName(name);
  };

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <Text style={styles.header}>My Class</Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <ScrollView contentContainerStyle={styles.listView}>
          {names.map((name, idx) => (
            <TouchableOpacity
              style={styles.buttonContainer}
              key={`name-${idx}`}
              onPress={() => handleClick(name)}
            >
              <Text>{name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View
          style={{
            flex: 2,
            marginLeft: "-20%",
            alignContent: "center",
          }}
        >
          <DailyLogsScreen name={name} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ClassListScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    fontSize: 20,
    marginLeft: 30,
    marginTop: 60,
    fontWeight: 600,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  listView: {
    width: "30%",
    marginLeft: 30,
    //flex: 1,
  },
  buttonContainer: {
    width: "100%",
    minHeight: 40,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
});
