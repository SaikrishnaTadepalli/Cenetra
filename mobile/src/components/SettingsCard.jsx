import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../constants/Colors";

import { Entypo, MaterialIcons } from "@expo/vector-icons";

const SettingsCard = ({ icon, title, screen, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.feedbackContainer}
        onPress={() => navigation.navigate(screen)}
      >
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name={icon} color={colors.darkGreen} size={24} />
            <Text style={styles.text}>{title}</Text>
          </View>
          <Entypo
            name="chevron-right"
            color={colors.darkGreen}
            size={24}
            style={{ justifyContent: "flex-end" }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  feedbackContainer: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 16,
    width: "100%",
    borderColor: colors.lightGrey,
    borderWidth: 0.5,
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
    color: colors.darkGreen,
    marginLeft: 10,
    alignSelf: "center",
  },
  logOutText: {
    color: colors.red,
    marginTop: 20,
    fontSize: 16,
    fontFamily: "InterMedium",
  },
});
