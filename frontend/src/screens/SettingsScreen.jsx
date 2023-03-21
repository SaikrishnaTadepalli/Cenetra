import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { configureStore } from "redux";

import colors from "../constants/Colors";
import SettingsCard from "../components/SettingsCard";
import authSlice, { logout } from "../redux/authSlice";

import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch } from "../redux/store";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const options = [
    {
      id: "1",
      icon: "person",
      text: "Profile",
      screen: "Profile",
    },
    {
      id: "2",
      icon: "feedback",
      text: "Leave feedback!",
    },
    {
      id: "3",
      icon: "chat-bubble",
      text: "Notification Settings",
    },
    {
      id: "4",
      icon: "privacy-tip",
      text: "Privacy",
    },
  ];
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <SettingsCard
          key={option.id}
          icon={option.icon}
          title={option.text}
          screen={option.screen}
          navigation={navigation}
        />
      ))}
      <TouchableOpacity onPress={() => dispatch(logout({ name: "auth" }))}>
        <Text style={styles.logOutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  feedbackContainer: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 16,
    width: "100%",
    borderColor: colors.darkGrey,
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
    color: colors.primaryText,
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
