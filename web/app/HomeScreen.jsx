import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { pending } = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      {pending ? (
        <Text style={styles.text}>Loading details...</Text>
      ) : (
        <Text style={styles.text}>Home screen</Text>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
