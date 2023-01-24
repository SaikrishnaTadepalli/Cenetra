import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useState } from "react";

import colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const DailyLogsCard = ({ navigation, stars, time }) => {
  const handleClick = () => {
    navigation.navigate("Log");
  };

  const renderIcon = () => (
    <Ionicons
      name="star"
      color={colors.yellow}
      size={16}
      style={{ marginRight: 2 }}
    />
  );

  const renderIcons = (num) => [...Array(num)].map(renderIcon);

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleClick}>
      <View style={styles.headerRow}>
        <Text style={styles.titleText}>{time}</Text>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {renderIcons(stars)}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DailyLogsCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 390,
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
