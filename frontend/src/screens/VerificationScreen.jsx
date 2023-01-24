import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const VerificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Verify your number</Text>
      <Text style={styles.text}>
        An email was sent to +1 (437) *** **16 with a verification code
      </Text>
      <View>
        <Text style={styles.codeText}>Enter Code</Text>
      </View>
      <View style={styles.boxContainer}>
        <TextInput style={styles.box} />
        <TextInput style={styles.box} />
        <TextInput style={styles.box} />
        <TextInput style={styles.box} />
        <TextInput style={styles.box} />
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "10%",
    paddingHorizontal: 24,
    width: "100%",
  },
  titleText: {
    fontSize: 30,
    color: Colors.darkPurple,
    fontFamily: "InterSemiBold",
    marginBottom: 10,
  },
  text: {
    color: Colors.darkPurple,
    fontSize: 14,
    fontFamily: "InterLight",
    width: "80%",
    textAlign: "center",
    marginBottom: 20,
  },
  codeText: {
    color: Colors.darkPurple,
    fontSize: 16,
    fontFamily: "InterRegular",
    alignSelf: "flex-start",
  },
  boxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  box: {
    height: 50,
    width: 50,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    borderColor: Colors.lightPurple,
  },
  buttonContainer: {
    marginTop: 30,
    backgroundColor: Colors.lightPurple,
    height: 40,
    width: "75%",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    alignSelf: "center",
    color: Colors.darkPurple,
    fontFamily: "InterSemiBold",
  },
});
