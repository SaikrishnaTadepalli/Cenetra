import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import colors from "../constants/Colors";
import SettingsCard from "../components/SettingsCard";
import { logout } from "../redux/authSlice";

import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const SettingsScreen = ({ navigation }) => {
  const icons = ["call-outline", "ios-location-outline", "mail-outline"];
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
      screen: "Feedback",
    },
    {
      id: "3",
      icon: "chat-bubble",
      text: "Notification Settings",
      screen: "NotificationSettings",
    },
    {
      id: "4",
      icon: "privacy-tip",
      text: "Privacy",
      screen: "Privacy",
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
      <View style={{ flexDirection: "row" }}>
        {icons.map((icon, idx) => (
          <View style={styles.icon} key={`settings-${idx}`}>
            <Ionicons
              key={icon}
              name={icon}
              size={30}
              color={colors.navyBlue}
            />
          </View>
        ))}
      </View>
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
  icon: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  logOutText: {
    color: colors.red,
    marginTop: 20,
    fontSize: 16,
    fontFamily: "InterMedium",
  },
});
