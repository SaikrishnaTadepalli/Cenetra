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
import { setStudents, loginUser, logout } from "../src/redux/authSlice";
import accessCodeMapping from "../api/data";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [isError, setIsError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const students = [];
  const { loginLoading, loginError } = useSelector((state) => state.auth);
  const state = useSelector((state) => state);

  async function handleClick() {
    const teacherID = accessCodeMapping[accessCode];
    if (teacherID) {
      dispatch(loginUser(teacherID))
        .then((response) => {
          if (!loginLoading && !loginError) {
            router.push("/HomeScreen");
            //router.push("/VerificationScreen");
            setIsError("");
            setIsVerified(true);
            response.payload.data.classes.forEach((element) => {
              if (element.teacher._id === teacherID) {
                element.students.forEach((s) => {
                  students.push(s);
                });
                return;
              }
            });
            dispatch(setStudents(students));
            localStorage.setItem("teacherID", teacherID);
            localStorage.setItem("isLoggedIn", "true");
            const stringifiedDetails = JSON.stringify({ students })
              .replace(/\\/g, "\\\\") // Escape backslashes
              .replace(/"/g, '\\"');
            localStorage.setItem("students", `"${stringifiedDetails}"`);
          } else if (loginError) {
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
    <>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Cenetra</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={accessCode}
            onChangeText={setAccessCode}
            keyboardType="number-pad"
            placeholder="Unique Access Code"
            placeholderTextColor={colors.lightGrey}
            palceholderTextFontFamily="InterMedium"
          />
          {isError !== "" ? (
            <Text style={styles.errorText}>{isError}</Text>
          ) : null}
          {loginLoading && !isError ? <Text>Signing in...</Text> : null}
        </View>
        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={handleClick}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    alignSelf: "flex-start",
    alignItems: "center",
    marginTop: "15%",
  },
  welcomeText: {
    fontSize: 64,
    fontFamily: "InterBold",
    color: "#23342C",
    marginBottom: 40,
    width: "60%",
  },
  inputContainer: {
    width: 332,
    marginBottom: 35,
    marginRight: 100,
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
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  loginButtonContainer: {
    justifyContent: "center",
    width: 130,
    height: 45,
    backgroundColor: "#23342C",
    borderRadius: 100,
    marginRight: 100,
  },
  loginButtonText: {
    alignSelf: "center",
    color: "white",
    fontFamily: "InterMedium",
  },
  errorText: {
    color: colors.red,
    marginTop: 20,
    fontSize: 14,
    alignSelf: "center",
  },
});
