import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../constants/Colors";

const WelcomeScreen = ({ navigation }) => {
  const handleClick = () => navigation.navigate("Verification");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>Student Number</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>Registered Phone Number</Text>
        <TextInput style={styles.input} />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleClick}>
        <Text style={styles.buttonText}>Register Number</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
    width: "100%",
  },
  text: {
    fontSize: 30,
    fontFamily: "InterSemiBold",
    color: colors.darkPurple,
    marginBottom: 40,
  },
  inputContainer: {
    width: "75%",
    alignItems: "center",
    marginBottom: 20,
  },
  inputHeader: {
    alignSelf: "flex-start",
    color: colors.darkPurple,
    fontFamily: "InterRegular",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: colors.lightPurple,
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 30,
    backgroundColor: colors.lightPurple,
    height: 40,
    width: "75%",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    alignSelf: "center",
    color: colors.darkPurple,
    fontFamily: "InterRegular",
  },
});
