import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

import colors from "../src/constants/Colors";
import { loginUser, logout } from "../src/redux/authSlice";
import accessCodeMapping from "../api/data";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [isError, setIsError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { pending, error, students } = useSelector((state) => state.auth);

  async function handleClick() {
    const teacherID = accessCodeMapping[accessCode];
    if (teacherID) {
      dispatch(loginUser(teacherID))
        .then((response) => {
          if (!pending && !error) {
            router.push("/HomeScreen");
            setIsError("");
            setIsVerified(true);
          } else if (error) {
            setIsError("Something went wrong. Please try again.");
            setTimeout(() => setIsError(""), 1000);
          }
        })
        .catch((error) => setIsError(true));
    } else {
      setIsError("Invalid access code.");
      setTimeout(() => setIsError(""), 1000);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>Unique Access Code</Text>
        <TextInput
          style={styles.input}
          value={accessCode}
          onChangeText={setAccessCode}
          keyboardType="number-pad"
        />
        {isError !== "" ? (
          <Text style={styles.errorText}>{isError}</Text>
        ) : null}
        {pending ? <Text>Signing in...</Text> : null}
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
  errorText: {
    color: colors.red,
    marginTop: 20,
    fontSize: 14,
    alignSelf: "center",
  },
});
