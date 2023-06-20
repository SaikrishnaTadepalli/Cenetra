import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

import colors from "../src/constants/Colors";
import {
  setClasses,
  loginUser,
  logout,
  sendSMS,
  getAdminID,
} from "../src/redux/authSlice";
import accessCodeMapping from "../api/data";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { loginLoading, loginError, adminInfoLoading, adminInfoError } =
    useSelector((state) => state.auth);

  async function handleClick() {
    dispatch(getAdminID(accessCode))
      .then((response) => {
        if (response.error) {
          setError(response.payload);
          setTimeout(() => setError(""), 2000);
        } else {
          const adminID = response.payload.data.adminByAdminNumber._id;
          localStorage.setItem("adminID", adminID);
          dispatch(loginUser(adminID))
            .then((response) => {
              if (!loginLoading && !loginError) {
                const classes = response.payload.data.classes;
                dispatch(setClasses(classes));
                localStorage.setItem("isLoggedIn", "true");
                const stringifiedDetails = JSON.stringify({ classes })
                  .replace(/\\/g, "\\\\") // Escape backslashes
                  .replace(/"/g, '\\"');
                localStorage.setItem("classes", `"${stringifiedDetails}"`);
                router.push("/HomeScreen");
              } else if (!loginLoading && loginError) {
                setError("Something went wrong. Please try again.");
                setTimeout(() => setError(""), 1000);
              }
            })
            .catch((error) =>
              setError(`Something went wrong try again, ${error}`)
            );
        }
      })
      .catch((error) =>
        console.error("Error in dispatching verifyLogin on web", error)
      );
  }
  //   dispatch(sendSMS(adminID))
  //     .then(() => {})
  //     .catch((error) => console.error("Error in sending SMS", error));
  // } else {
  //   setError(response.payload);
  //   setTimeout(() => setError(""), 1000);
  // }

  // if (teacherID) {
  // } else {
  //   setError("Invalid access code.");
  //   setTimeout(() => setError(""), 1000);
  // }

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
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
          {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
          {loginLoading && !error ? <Text>Signing in...</Text> : null}
        </View>
        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={handleClick}
          isDisabled={isDisabled}
        >
          <Text
            style={[styles.loginButtonText, { opacity: isDisabled ? 0.5 : 1 }]}
          >
            Verify
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/loginIllustration.png")}
          style={{
            width: "100%",
            height: "85%",
          }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  loginContainer: {
    width: "40%",
    alignItems: "center",
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
    marginRimaght: 10,
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
    marginRight: 20,
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
  imageContainer: {
    backgroundColor: "#F8EDEB",
    width: "60%",
    height: "100%",
    justifyContent: "flex-end",
  },
});
