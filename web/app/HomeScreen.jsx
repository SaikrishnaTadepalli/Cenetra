import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const { pending, isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();

  // useEffect(() => {
  //   if (!pending && !isLoggedIn) {
  //     router.push("/LoginScreen");
  //   }
  // }, [pending, isLoggedIn]);

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
