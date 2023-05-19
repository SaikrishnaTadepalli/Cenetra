import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./LoginScreen";
import Colors from "../src/constants/Colors";
import ClassListScreen from "./ClassListScreen";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

const App = () => {
  console.log("header 2");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Cenetra</Text>
      </View>
      <LoginScreen />
      {/* <ClassListScreen /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    // alignContent: "center",
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