import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from "react-native";

import CreateResponsiveStyle from "../src/components/CreateResponsiveStyle";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

import colors from "../src/constants/Colors";
import {
  setStudents,
  loginUser,
  logout,
  sendSMS,
  getTeacherID,
} from "../src/redux/authSlice";
import accessCodeMapping from "../api/data";

const LoginScreen = () => {
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
  const dispatch = useDispatch();
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [isError, setIsError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { loginLoading, loginError, teacherInfoLoading, teacherInfoError } =
    useSelector((state) => state.auth);
  console.log(layout);
  async function handleClick() {
    dispatch(getTeacherID(accessCode)).then((response) => {
      if (!response.error) {
        router.push("/VerificationScreen");
        const responseData = response.payload.data.teacherByTeacherNumber;
        const teacherID = responseData._id;
        const teacherName =
          responseData.firstName + " " + responseData.lastName;
        // console.log(teacherID);
        localStorage.setItem("teacherID", teacherID);
        localStorage.setItem("teacherName", teacherName);
        setIsDisabled(true);
        dispatch(sendSMS(teacherID))
          .then(() => {})
          .catch((error) => console.error("Error in sending SMS", error));
      } else {
        setIsError("Invalid access code.");
        setTimeout(() => setIsError(""), 2000);
      }
    });

    // if (teacherID) {
    // } else {
    //   setIsError("Invalid access code.");
    //   setTimeout(() => setIsError(""), 1000);
    // }
  }

  return (
    <View style={styles("container")}>
      <View style={styles("loginContainer")}>
        <Text style={styles("welcomeText")}>Welcome to Curiouss Kids</Text>
        <View style={styles("inputContainer")}>
          <TextInput
            style={styles("input")}
            value={accessCode}
            onChangeText={setAccessCode}
            keyboardType="number-pad"
            placeholder="Unique Access Code"
            placeholderTextColor={colors.lightGrey}
            palceholderTextFontFamily="InterMedium"
          />
          {isError !== "" ? (
            <Text style={styles("errorText")}>{isError}</Text>
          ) : null}
          {loginLoading && !isError ? <Text>Signing in...</Text> : null}
        </View>
        <TouchableOpacity
          style={styles("loginButtonContainer")}
          onPress={handleClick}
          isDisabled={isDisabled}
        >
          <Text
            style={[
              styles("loginButtonText"),
              { opacity: isDisabled ? 0.5 : 1 },
            ]}
          >
            Verify
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles("imageContainer")}>
        <Image
          source={require("../assets/images/SchoolLogo.png")}
          style={{
            width: "40%",
            height: "40%",
          }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const responsiveStyle = CreateResponsiveStyle(
  {
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
      color: colors.darkGreen,
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
      backgroundColor: "#23342C",
      width: "60%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  {
    container: {
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    loginContainer: {
      width: "100%",
      alignItems: "center",
    },
    imageContainer: {
      width: "0%",
    },
    welcomeText: {
      fontSize: 40,
    },
  }
);

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
    color: colors.darkGreen,
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
    backgroundColor: "#23342C",
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
