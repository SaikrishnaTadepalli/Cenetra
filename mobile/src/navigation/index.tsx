import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";

import colors from "../constants/Colors";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList } from "../../types";
import { RootTabParamList } from "../../types";

import DailyLogsScreen from "../screens/DailyLogsScreen";
import ChatScreen from "../screens/ChatScreen";
import NoticeScreen from "../screens/NoticeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GalleryScreen from "../screens/GalleryScreen";
import LoginScreen from "../screens/LoginScreen";
import { RootState } from "../redux/store";
import LogScreen from "../screens/LogScreen";
import NoticeInfoScreen from "../screens/NoticeInfoScreen";
// import Logo from "../../assets/icons/logo.svg";
import IndividualChatScreen from "../screens/IndividualChatScreen";
import VerificationScreen from "../screens/VerificationScreen";
import ImageViewScreen from "../screens/ImageViewScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import NotificationSettingsScreen from "../screens/NotificationSettingsScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

// Understand This
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.appBackground,
  },
};

const Navigation = React.forwardRef((props, ref) => {
  SplashScreen.preventAutoHideAsync(); // Understand this
  const [appIsReady, setAppIsReady] = React.useState(true); // understand this

  // understand this
  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    } else {
      SplashScreen.preventAutoHideAsync();
    }
  }, []);

  // Understand myTheme and onLayoutRootView
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={MyTheme}
      onReady={onLayoutRootView}
    >
      <RootNavigator />
    </NavigationContainer>
  );
});

export default Navigation;

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.appBackground },
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Gallery"
            component={GalleryScreen}
            options={({ navigation, route }) => {
              return {
                headerTitle: route.params ? route.params.title : "",
              };
            }}
          />
          <Stack.Screen
            name="Log"
            component={LogScreen}
            options={({ navigation, route }) => {
              return {
                headerTitle: route.params ? route.params.title : "",
              };
            }}
          />
          <Stack.Screen
            name="NoticeInfo"
            component={NoticeInfoScreen}
            options={({ navigation, route }) => {
              return {
                headerTitle: route.params ? route.params.title : "",
              };
            }}
          />
          <Stack.Screen
            name="IndividualChat"
            component={IndividualChatScreen}
            options={({ navigation, route }) => {
              return {
                headerTitle: route.params ? route.params.title : "",
              };
            }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen
            name="ImageView"
            component={ImageViewScreen}
            options={({ navigation, route }) => {
              return {
                headerTitle: "",
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("Coming soon!", "", [
                        {
                          text: "OK",
                          onPress: () => console.log("OK Pressed"),
                        },
                      ]);
                    }}
                  >
                    <Ionicons
                      name="ios-download-outline"
                      size={28}
                      color={colors.darkGrey}
                    />
                  </TouchableOpacity>
                ),
              };
            }}
          />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
          <Stack.Screen
            name="NotificationSettings"
            component={NotificationSettingsScreen}
          />
          <Stack.Screen name="Privacy" component={PrivacyScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            component={LoginScreen}
            options={{
              headerLeft: () => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: -30,
                  }}
                >
                  <Image
                    source={require("../../assets/images/SchoolAppIcon.png")}
                    style={{ height: 30, width: 30 }}
                  />
                  <Image
                    source={require("../../assets/images/AppHeader.png")}
                    style={{ height: 50, width: "70%" }}
                    resizeMode="contain"
                  />
                </View>
              ),
              headerTitle: "",
            }}
          />
          <Stack.Screen name="Verification" component={VerificationScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation, route }) => {
  return (
    <BottomTab.Navigator
      initialRouteName="DailyLogs"
      screenOptions={{
        tabBarStyle: {
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowOpacity: 0.5,
          shadowRadius: 12.0,
          elevation: 24,
          backgroundColor: colors.white,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          height: 90,
        },

        headerTitleStyle: {
          textAlign: "left",
          color: colors.headerText,
        },
        headerStyle: {
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 1,
          shadowRadius: 1.0,
          backgroundColor: colors.white,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          height: 100,
        },
        headerLeft: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 18,
              marginTop: 10,
            }}
          >
            <Image
              source={require("../../assets/images/SchoolAppIcon.png")}
              style={{ height: 30, width: 30 }}
            />
            <Image
              source={require("../../assets/images/AppHeader.png")}
              style={{
                height: 100,
                width: Platform.OS === "ios" ? "100%" : "60%",
              }}
              resizeMode="contain"
            />
            {/* <MaterialIcons name="library-books" size={24} color="black" />
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 18,
                marginLeft: 16,
              }}
            >
              Cenetra
            </Text> */}
          </View>
        ),
        headerTitle: "",
        tabBarItemStyle: { height: 45, marginTop: 10 },
        tabBarActiveTintColor: "#02455299",
        tabBarInactiveTintColor: colors.darkGrey,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="DailyLogs"
        component={DailyLogsScreen}
        options={({ navigation, route }) => {
          return {
            tabBarIcon: ({ focused, color }) => (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: "#A0B2AF99",
                        width: 45,
                        height: 45,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 6,
                      }
                    : { backgroundColor: colors.white }
                }
              >
                <Ionicons name="document" size={24} color={color} />
              </View>
            ),
          };
        }}
      />
      <BottomTab.Screen
        name="Notice"
        component={NoticeScreen}
        options={({ navigation, route }) => {
          return {
            tabBarIcon: ({ focused, color }) => (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: "#A0B2AF99",
                        width: 45,
                        height: 45,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 6,
                      }
                    : { backgroundColor: colors.white }
                }
              >
                <Octicons name="bell-fill" size={24} color={color} />
              </View>
            ),
          };
        }}
      />
      {/* <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={({ navigation, route }) => {
          return {
            tabBarIcon: ({ focused, color }) => (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: "#A0B2AF99",
                        width: 45,
                        height: 45,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 6,
                      }
                    : { backgroundColor: colors.white }
                }
              >
                <Ionicons name="chatbubble" color={color} size={24} />
              </View>
            ),
          };
        }}
      /> */}
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation, route }) => {
          return {
            tabBarIcon: ({ focused, color }) => (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: "#A0B2AF99",
                        width: 45,
                        height: 45,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 6,
                      }
                    : { backgroundColor: colors.white }
                }
              >
                <Ionicons name="settings-sharp" size={24} color={color} />
              </View>
            ),
          };
        }}
      />
    </BottomTab.Navigator>
  );
};
