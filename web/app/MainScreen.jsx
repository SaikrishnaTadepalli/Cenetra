import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

const MainScreen = ({}) => {
  const router = useRouter();
  const handleDailyLogsPress = () => {
    // Navigate to daily logs screen
    //navigation.navigate("DailyLogs");
    router.push("/DailyLogScreen");
  };

  const handleStudentsPress = () => {
    // Navigate to students screen
    //navigation.navigate("Students");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cenetra</Text>
        <Text style={styles.subtitle}>Teacher</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDailyLogsPress}>
          <Text style={styles.buttonText}>Daily Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStudentsPress}>
          <Text style={styles.buttonText}>Students</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EAECFF",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#EAECFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
  },
});
