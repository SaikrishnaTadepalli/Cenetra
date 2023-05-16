import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import colors from "../src/constants/Colors";
import { useRouter } from "expo-router";

const LoginScreen = ({ navigation }) => {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState();
  async function handleClick() {
    router.push("/ClassListScreen");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>Name</Text>
        <TextInput style={styles.input} keyboardType="number-pad" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>Unique Access Code</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          keyboardType="number-pad"
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleClick}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "30%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 150,
  },
  text: {
    fontSize: 30,
    fontWeight: 600,
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
    fontWeight: 400,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: colors.lightPurple,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 15,
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
    color: colors.primaryText,
    fontWeight: 600,
  },
});
