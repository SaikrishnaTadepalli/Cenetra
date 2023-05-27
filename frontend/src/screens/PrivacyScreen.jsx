import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  text: {
    fontFamily: "InterBold",
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 100,
  },
});
