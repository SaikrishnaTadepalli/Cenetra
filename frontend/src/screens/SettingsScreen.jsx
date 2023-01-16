import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import colors from "../constants/Colors";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.feedbackContainer}>
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="feedback" color={colors.navyBlue} size={24} />
            <Text style={styles.text}>Leave Feedback!</Text>
          </View>
          <Entypo
            name="chevron-right"
            color={colors.navyBlue}
            size={24}
            style={{ justifyContent: "flex-end" }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.logOutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  feedbackContainer: {
    backgroundColor: colors.lightPurple,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 16,
    width: "100%",
  },
  contentContainer: {
    width: "100%",
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "InterMedium",
    fontSize: 16,
    color: colors.navyBlue,
    marginLeft: 10,
  },
  logOutText: {
    color: colors.red,
    marginTop: 20,
    fontSize: 16,
    fontFamily: "InterMedium",
  },
});
