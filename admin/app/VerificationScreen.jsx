import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  sendSMS,
  verifyLogin,
  loginUser,
  setClasses,
} from "../src/redux/authSlice";

import colors from "../src/constants/Colors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useRouter } from "expo-router";

const VerificationScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //const { curStudentDetails } = useSelector((state) => state.auth);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: 5 });
  const {
    verificationLoading,
    verificationError,
    loginError,
    loginLoading,
    adminInfo,
  } = useSelector((state) => state.auth);
  const adminID = localStorage.getItem("adminID");
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleClick = async () => {
    //console.log("dispatch", value);

    dispatch(verifyLogin({ adminID, code: value }))
      .then(async (response) => {
        if (response.error) {
          setError(response.payload);
          setTimeout(() => setError(""), 2000);
        } else if (!response.payload.data.verifyCode) {
          setError("Invalid login code");
          setTimeout(() => setError(""), 2000);
        } else {
          const adminID = localStorage.getItem("adminID");
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
  };

  const onResend = () => {
    dispatch(sendSMS(adminID))
      .then(() => {
        setIsCodeSent(true);
      })
      .catch((error) => console.error("Error in sending SMS", error));
  };
  return (
    <View style={styles.container}>
      <View style={styles.verificationContainer}>
        <Text style={styles.titleText}>Verify your number</Text>
        <Text style={styles.text}>
          Enter Verification code sent to {adminInfo && adminInfo.phoneNumber}
        </Text>
        <View style={{ alignSelf: "flex-start", width: "41%" }}>
          <Text style={styles.codeText}>Enter Code</Text>
        </View>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={5}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.box, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <TouchableOpacity onPress={onResend}>
          <Text style={styles.resendCodeText}>Resend Code?</Text>
        </TouchableOpacity>
        {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
        {isCodeSent ? <Text>Code resent successfully!</Text> : null}
        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={handleClick}
        >
          <Text style={styles.loginButtonText}>Verify</Text>
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

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  verificationContainer: {
    width: "40%",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    color: "#23342C",
    fontFamily: "InterSemiBold",
    marginBottom: 10,
  },
  text: {
    color: "#23342C",
    fontSize: 14,
    fontFamily: "InterRegular",
    width: "85%",
    textAlign: "center",
    marginBottom: 20,
  },
  codeText: {
    color: "#23342C",
    fontSize: 16,
    fontFamily: "InterRegular",
    textAlign: "right",
    // paddingLeft: 220,
  },
  boxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    marginTop: 10,
    height: 60,
    width: 50,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    borderColor: "#A0B2AF",
    textAlign: "center",
    lineHeight: 58,
    fontSize: 24,
    fontFamily: "InterMedium",
  },
  loginButtonContainer: {
    justifyContent: "center",
    width: 130,
    height: 45,
    backgroundColor: "#23342C",
    borderRadius: 100,
    marginTop: 20,
  },
  loginButtonText: {
    alignSelf: "center",
    color: "white",
    fontFamily: "InterMedium",
  },
  errorText: {
    color: colors.red,
    marginTop: 10,
    textAlign: "left",
  },
  focusCell: {
    borderColor: "#23342C",
  },
  resendCodeText: {
    marginLeft: 180,
    marginTop: 10,
    color: "#99B8BE",
  },
  imageContainer: {
    backgroundColor: "#F8EDEB",
    width: "60%",
    height: "100%",
    justifyContent: "flex-end",
  },
});
