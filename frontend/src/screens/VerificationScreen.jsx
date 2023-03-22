import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";


import colors from "../constants/Colors";

const VerificationScreen = ({ route }) => {
  const renderBox = () => (
    <TextInput style={styles.box} keyboardType="number-pad" maxLength={1} />
  );

  const renderBoxes = (num) => [...Array(num)].map(renderBox);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Verify your number</Text>
      <Text style={styles.text}>
        An email was sent to {route.params.number} with a verification code
      </Text>
      <View style={{ alignSelf: "flex-start", width: "40%" }}>
        <Text style={styles.codeText}>Enter Code</Text>
      </View>
      <View style={styles.boxContainer}>{renderBoxes(5)}</View>
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
    paddingHorizontal: 40,
    width: "100%",
  },
  titleText: {
    fontSize: 30,
    color: colors.darkPurple,
    fontFamily: "InterSemiBold",
    marginBottom: 10,
  },
  text: {
    color: colors.darkPurple,
    fontSize: 14,
    fontFamily: "InterLight",
    width: "85%",
    textAlign: "center",
    marginBottom: 20,
  },
  codeText: {
    color: colors.darkPurple,
    fontSize: 16,
    fontFamily: "InterRegular",
    textAlign: "center",
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
    borderColor: colors.lightPurple,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "InterSemiBold",
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
    fontFamily: "InterSemiBold",
  },
});
