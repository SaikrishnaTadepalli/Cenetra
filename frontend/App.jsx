import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BottomTabNavigator from "./RootNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header} /> */}
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: 375,
    height: 64,
    backgroundColor: "red",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
