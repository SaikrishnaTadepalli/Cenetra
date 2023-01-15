import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Card = ({ isLog, navigation, navigateTo }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate(navigateTo)}
    >
      <View style={styles.headerRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isLog ? null : <View style={styles.dotContainer} />}
          <Text style={styles.titleText}>Title</Text>
        </View>
        <Text style={styles.timeText}>Time</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Created on...</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: 390,
    backgroundColor: "#FFFFFF",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  dotContainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "pink",
    marginRight: 8,
  },
  titleText: {
    fontWeight: "500",
    fontSize: 16,
    color: "#363535",
    textAlign: "center",
  },
  timeText: {
    color: "#A2A2A2",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  dateContainer: {},
  dateText: {
    color: "#A2A2A2",
    fontSize: 14,
    fontWeight: "500",
  },
});
