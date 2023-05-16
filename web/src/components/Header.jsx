import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Cenetra</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
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
