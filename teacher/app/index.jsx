import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./LoginScreen";
import Colors from "../src/constants/Colors";
import ClassListScreen from "./ClassListScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../src/redux/store";
import HomeScreen from "./HomeScreen";
import { useEffect } from "react";
import { logout } from "../src/redux/authSlice";

const App = () => {
  //console.log("header 2");
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };
  useEffect(() => logoutUser(), []);
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    height: 50,
    width: "100%",
    backgroundColor: Colors.navyBlue,
  },
  text: {
    fontWeight: 800,
    height: "100%",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15,
    color: "white",
  },
});
