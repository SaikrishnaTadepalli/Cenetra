import {
  StyleSheet,
  Text,
  View,
  TextInput,
  useWindowDimensions,
} from "react-native";
import React from "react";

import colors from "../constants/Colors";
import CreateResponsiveStyle from "../components/CreateResponsiveStyle";

const OpenEndedQuestion = ({ question, answer, handleInputChange }) => {
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
  return (
    <View style={styles("container")}>
      <Text style={styles("inputText")}>{question}</Text>
      <TextInput
        style={styles("inputContainer")}
        multiline
        editable={true}
        key={question}
        value={answer}
        onChangeText={handleInputChange}
      />
    </View>
  );
};

export default OpenEndedQuestion;

const responsiveStyle = CreateResponsiveStyle(
  {
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      width: "100%",
    },
    inputContainer: {
      minHeight: 400,
      borderColor: colors.lightGrey,
      borderWidth: 1,
      borderRadius: 4,
      width: "80%",
      justifyContent: "center",
      backgroundColor: "white",
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    inputText: {
      width: "20%",
      marginRight: 20,
      fontSize: 16,
      fontFamily: "InterSemiBold",
    },
  },
  {
    inputContainer: {
      width: "60%",
    },
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  inputContainer: {
    minHeight: 400,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    width: "80%",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputText: {
    width: "20%",
    marginRight: 20,
    fontSize: 16,
    fontFamily: "InterSemiBold",
  },
});
