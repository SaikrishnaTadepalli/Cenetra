import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../src/constants/Colors";
import { logout } from "../src/redux/authSlice";
import { useRouter } from "expo-router";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleClick = () => {
    dispatch(logout());
    router.push("/LoginScreen");
  };
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/LoginScreen");
    }
  }, [isLoggedIn]);

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
