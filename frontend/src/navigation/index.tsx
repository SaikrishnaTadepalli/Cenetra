import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import colors from "../constants/Colors";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList } from "../../types";
import { RootTabParamList } from "../../types";

import DailyLogsScreen from "../screens/DailyLogsScreen";
import ChatScreen from "../screens/ChatScreen";
import NoticeScreen from "../screens/NoticeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import GalleryScreen from "../screens/GalleryScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { RootState } from "../redux/store";
import LogScreen from "../screens/LogScreen";
import NoticeInfoScreen from "../screens/NoticeInfoScreen";

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

function RootNavigator() {
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
          <Stack.Screen name="Gallery" component={GalleryScreen} />
          <Stack.Screen name="Log" component={LogScreen} />
          <Stack.Screen name="NoticeInfo" component={NoticeInfoScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator({ navigation, route }) {
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
          backgroundColor: "#fff",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          height: 90,
        },

        headerTitleStyle: {
          textAlign: "left",
          color: colors.primaryText,
        },
        headerStyle: {
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 1,
          shadowRadius: 1.0,
          backgroundColor: "#ffff",
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          height: 100,
        },
        headerLeft: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <SimpleLineIcons
              name="graph"
              size={24}
              color="#037971"
              style={{ marginLeft: 12 }}
            />
            <Text style={{ fontWeight: "400", fontSize: 16, marginLeft: 16 }}>
              Cenetra
            </Text>
          </View>
        ),
        headerTitle: "",
        tabBarItemStyle: { height: 45, marginTop: 10 },
        tabBarActiveTintColor: "#037971",
        tabBarInactiveTintColor: "#9ac9c6",
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="DailyLogs"
        component={DailyLogsScreen}
        options={({ navigation, route }) => {
          return {
            tabBarIcon: ({ color }) => (
              <Ionicons name="document-outline" size={28} color={color} />
            ),
          };
        }}
      />
      <BottomTab.Screen
        name="Notice"
        component={NoticeScreen}
        options={({ navigation, route }) => {
          return {
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="bell-outline"
                size={28}
                color={color}
              />
            ),
          };
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={({ navigation, route }) => {
          return {
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="chat-outline"
                size={28}
                color={color}
              />
            ),
          };
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation, route }) => {
          return {
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" size={28} color={color} />
            ),
          };
        }}
      />
    </BottomTab.Navigator>
  );
}
