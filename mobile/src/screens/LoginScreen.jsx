import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { fetchStudent, loginUser, sendSMS } from "../redux/authSlice";
import { useSelector } from "react-redux";
const LoginScreen = ({ navigation }) => {
  const [studentNumber, setStudentNumber] = useState();
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(loginUser(studentNumber))
      .then((response) => {
        if (response.error) {
          setError(response.payload);
          setTimeout(() => setError(""), 2000);
        } else {
          const studentID = response.payload.data.studentByStudentNumber._id;
          dispatch(sendSMS(studentID))
            .then(() => {
              setIsDisabled(true);
              navigation.navigate("Verification");
            })
            .catch((error) => console.error("Error in sending SMS", error));
        }
      })
      .catch((error) => {
        console.error("Error in dispatch to loginUser", error);
        setError(error);
      });
  };

  useEffect(() => setIsDisabled(false), []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>Student Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={studentNumber}
          onChangeText={setStudentNumber}
        />
        {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, { opacity: isDisabled ? 0.5 : 1 }]}
        onPress={handleClick}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
    width: "100%",
  },
  text: {
    fontSize: 30,
    fontFamily: "InterMedium",
    color: colors.darkPurple,
    marginBottom: 40,
  },
  inputContainer: {
    width: "60%",
    alignItems: "center",
    marginBottom: 20,
  },
  inputHeader: {
    alignSelf: "flex-start",
    color: colors.darkPurple,
    fontFamily: "InterRegular",
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
    width: "60%",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    alignSelf: "center",
    color: colors.primaryText,
    fontFamily: "InterSemiBold",
  },
  errorText: {
    color: colors.red,
    marginTop: 10,
    textAlign: "left",
  },
});
