import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { sendSMS, verifyLogin, login } from "../src/redux/authSlice";

import colors from "../src/constants/Colors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const VerificationScreen = () => {
  const dispatch = useDispatch();
  //const { curStudentDetails } = useSelector((state) => state.auth);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 5 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleClick = async () => {
    //console.log("dispatch", value);
    dispatch(verifyLogin({ studentID: "", code: value }))
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
          // await AsyncStorage.setItem("studentID", curStudentDetails._id);
          // await AsyncStorage.setItem("isLoggedIn", "true");
          dispatch(login());
        }
      })
      .catch((error) =>
        console.error("Error in dispatching verifyLogin", error)
      );
  };

  useEffect(() => {
    dispatch(sendSMS(""))
      .then(() => {})
      .catch((error) => console.error("Error in sending SMS", error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Verify your number</Text>
      <Text style={styles.text}>
        A message was sent to number with a verification code
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
    alignSelf: "center",
    alignItems: "center",
    marginTop: "10%",
    paddingHorizontal: 40,
    width: "30%",
  },
  titleText: {
    fontSize: 30,
    color: colors.darkPurple,
    fontFamily: "InterMedium",
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
  },
  box: {
    marginTop: 10,
    height: 60,
    width: 50,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    borderColor: colors.lightPurple,
    textAlign: "center",
    lineHeight: 58,
    fontSize: 24,
    fontFamily: "InterMedium",
  },
  buttonContainer: {
    marginTop: 30,
    backgroundColor: colors.lightPurple,
    height: 40,
    width: "75%",
    borderRadius: 10,
    justifyContent: "center",
  },
  errorText: {
    color: colors.red,
    marginTop: 10,
    textAlign: "left",
  },
  buttonText: {
    alignSelf: "center",
    color: colors.darkPurple,
    fontFamily: "InterSemiBold",
    fontWeight: 600,
  },
  focusCell: {
    borderColor: colors.darkPurple,
  },
});
