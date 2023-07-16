import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const EmptyState = ({ emptyStateText }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.picture}
        source={require("../../assets/icons/emptyState.png")}
        resizeMode="cover"
      />
      <Text style={styles.emptyStateText}>{emptyStateText}</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
  },
  emptyStateText: {
    color: "#99B8BE",
    textAlign: "center",
    fontSize: 16,
  },
  picture: {
    alignSelf: "center",
    marginBottom: 20,
    height: 120,
    width: 120,
  },
});
