import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./app/LoginScreen";
import Colors from "./src/constants/Colors";
import ClassListScreen from "./app/ClassListScreen";
import { useSelector } from "react-redux";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Cenetra</Text>
      </View>
      {isLoggedIn ? <LoginScreen /> : <ClassListScreen />}
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
