import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useState } from "react";

import colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const DailyLogsCard = ({ navigation, stars, time }) => {
  const handleClick = () => {
    navigation.navigate("Log");
  };

  const renderIcon = (name) => (
    <Ionicons
      name={name}
      color={colors.yellow}
      size={16}
      style={{ marginRight: 2 }}
    />
  );

  const renderIcons = (num, name) =>
    [...Array(num)].map(() => renderIcon(name));

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleClick}>
      <View style={styles.headerRow}>
        <Text style={styles.titleText}>{time}</Text>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {renderIcons(stars, "star")}
          {renderIcons(5 - stars, "star-outline")}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DailyLogsCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    minHeight: 55,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 15,
    color: colors.primaryText,
    fontFamily: "InterMedium",
  },
});
