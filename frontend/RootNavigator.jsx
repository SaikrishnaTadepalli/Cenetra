import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LogScreen from "./src/screens/LogScreen";
import ChatScreen from "./src/screens/ChatScreen";
import NoticeScreen from "./src/screens/NoticeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import PicturesScreen from "./src/screens/PicturesScreen";
//import Header from "./components/Header";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Log") {
            iconName = "document-outline";
          } else if (route.name === "Notice") {
            return (
              <MaterialCommunityIcons
                name="bell-outline"
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Chat") {
            return (
              <MaterialCommunityIcons
                name="chat-outline"
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Settings") {
            return (
              <Image
                style={{ width: 25, height: 25, borderRadius: 12.5 }}
                source={{
                  uri: "https://reactnative.dev/img/tiny_logo.png",
                }}
              />
            );
          } else if (route.name === "Pictures") {
            iconName = "camera-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "#037971",
        tabBarShowLabel: false,
        // header: ({ navigation, route, options }) => {
        //   return <Header />;
        // },
      })}
    >
      <Tab.Screen name="Log" component={LogScreen} />
      <Tab.Screen name="Notice" component={NoticeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Pictures" component={PicturesScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
