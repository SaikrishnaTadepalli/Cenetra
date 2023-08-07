import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  // Linking,
} from "react-native";
import React from "react";
import * as Linking from "expo-linking";

import colors from "../constants/Colors";
import SettingsCard from "../components/SettingsCard";
import { logout } from "../redux/authSlice";

import { useDispatch } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import FeedbackScreen from "./FeedbackScreen";

const SettingsScreen = ({ navigation }) => {
  const phoneNumber = "+91 76206 33298";
  const email = "yhiigroup@gmail.com";
  const latitude = 15.361291547403729;
  const longitude = 75.15513588749864;
  const maps = `maps://app?daddr=${latitude},${longitude}&dirflg=d&t=m`;
  const fullAddress = "YHI International Group's Discovery hub";
  const url = Platform.select({
    ios: maps,
    android: `geo:0,0?q=${fullAddress}`,
  });
  const icons = [
    { icon: "call-outline", url: `tel:${phoneNumber}`, iconFamily: "Ionicons" },
    { icon: "ios-location-outline", url: url, iconFamily: "Ionicons" },
    { icon: "mail-outline", url: `mailto:${email}`, iconFamily: "Ionicons" },
    {
      icon: "web",
      url: "https://www.yhiinternationalgroup.com",
      iconFamily: "MaterialCommunityIcons",
    },
  ];
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
      icon: "chat-bubble",
      text: "Notification Settings",
      screen: "NotificationSettings",
    },
    {
      id: "3",
      icon: "privacy-tip",
      text: "Privacy",
      screen: "Privacy",
    },
  ];
  const handleOpenLink = async () => {
    const phoneNumber = "+917620633298"; // Replace with your desired URL

    try {
      await Linking.openURL(`tel:${phoneNumber}`);
      //console.log("log", Linking.openURL(`tel:${phoneNumber}`));
    } catch (error) {
      console.error("Failed to open link:", error);
    }
  };

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
      <FeedbackScreen />
      <View style={{ flexDirection: "row" }}>
        {icons.map((icon, idx) => (
          <TouchableOpacity
            style={styles.icon}
            key={`settings-${idx}`}
            onPress={() => Linking.openURL(icon.url)}
          >
            {icon.iconFamily === "Ionicons" ? (
              <Ionicons
                key={icon.icon}
                name={icon.icon}
                size={30}
                color={colors.darkGreen}
              />
            ) : (
              <MaterialCommunityIcons
                key={icon.icon}
                name={icon.icon}
                size={30}
                color={colors.darkGreen}
              />
            )}
          </TouchableOpacity>
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
