import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { sendSMS, verifyLogin, login } from "../redux/authSlice";

import colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VerificationScreen = () => {
  const dispatch = useDispatch();
  const { curStudentDetails } = useSelector((state) => state.auth);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: 5 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleClick = async () => {
    //console.log("dispatch", value);
    dispatch(verifyLogin({ studentID: curStudentDetails._id, code: value }))
      .then(async (response) => {
        // console.log("dispatch", response);
        //console.log("payload", response.payload.data.verifyCode);
        if (response.error) {
          setError(response.payload);
          setTimeout(() => setError(""), 2000);
        } else if (!response.payload.data.verifyCode) {
          setError("Invalid login code");
          setTimeout(() => setError(""), 2000);
        } else {
          await AsyncStorage.setItem("studentID", curStudentDetails._id);
          await AsyncStorage.setItem("isLoggedIn", "true");
          dispatch(login());
        }
      })
      .catch((error) =>
        console.error("Error in dispatching verifyLogin", error)
      );
  };

  const onResend = () => {
    dispatch(sendSMS(curStudentDetails._id))
      .then((response) => {
        if (response.error) {
          setError("Error while resending code");
          setTimeout(() => setError(""), 2000);
        } else {
          setIsCodeSent(true);
          setTimeout(() => setIsCodeSent(false), 2000);
        }
      })
      .catch((error) => console.error("Error in sending SMS", error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Verify your number</Text>
      <Text style={styles.text}>
        A message was sent to {curStudentDetails.primaryContactNumber} with a
        verification code
      </Text>
      <View style={{ alignSelf: "flex-start", width: "40%" }}>
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
        containerProps={{
          contentContainerStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        renderCell={({ index, symbol, isFocused }) => (
          <View key={index} style={[styles.box, isFocused && styles.focusCell]}>
            <Text
              key={index}
              style={styles.enteredText}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={onResend}>
        <Text style={styles.resendCodeText}>Resend Code?</Text>
      </TouchableOpacity>
      {isCodeSent ? <Text>Code resent successfully!</Text> : null}
      {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleClick}>
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
    color: colors.darkGreen,
    fontFamily: "InterMedium",
    marginBottom: 10,
  },
  text: {
    color: colors.darkGreen,
    fontSize: 14,
    fontFamily: "InterLight",
    width: "85%",
    textAlign: "center",
    marginBottom: 20,
  },
  resendCodeText: {
    marginLeft: 180,
    marginTop: 10,
    color: "#99B8BE",
  },
  codeText: {
    color: colors.darkGreen,
    fontSize: 16,
    fontFamily: "InterRegular",
    marginLeft: 10,
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
    textAlignVertical: "center",
    alignContent: "center",
    fontSize: 24,
    fontFamily: "InterMedium",
    justifyContent: "center",
  },
  enteredText: {
    color: colors.darkGreen,
    fontSize: 24,
    fontFamily: "InterRegular",
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 30,
    backgroundColor: colors.darkGreen,
    height: 40,
    width: "75%",
    borderRadius: 100,
    justifyContent: "center",
  },
  errorText: {
    color: colors.red,
    marginTop: 10,
    textAlign: "left",
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
    fontFamily: "InterSemiBold",
  },
  focusCell: {
    borderColor: colors.darkGreen,
  },
});
