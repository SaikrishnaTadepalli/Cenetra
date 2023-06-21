import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

import colors from "../constants/Colors";

const OpenEndedQuestion = ({ question, answer, handleInputChange }) => {
  return (
    <View style={{ width: "60%" }}>
      <View style={styles.container}>
        <Text style={styles.inputText}>{question}</Text>
        <TextInput
          style={styles.inputContainer}
          multiline
          editable={true}
          numberOfLines={6}
          maxLength={200}
          key={question}
          value={answer}
          onChangeText={handleInputChange}
        />
      </View>
    </View>
  );
};

export default OpenEndedQuestion;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputContainer: {
    minHeight: 100,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    width: "100%",
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
