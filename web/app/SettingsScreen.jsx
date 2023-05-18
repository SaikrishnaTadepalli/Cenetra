import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";

import Colors from "../src/constants/Colors";
import { logout } from "../src/redux/authSlice";
import { useRouter } from "expo-router";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(logout());
    router.push("/LoginScreen");
  };
  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.logOutText} onPress={handleClick}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {},
  logOutText: {
    color: Colors.red,
    marginTop: 20,
    fontSize: 24,
    fontWeight: 600,
    alignSelf: "center",
  },
});
