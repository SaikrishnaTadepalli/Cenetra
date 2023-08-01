import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const MultipleChoiceQuestion = ({
  question,
  answers,
  selectedValue,
  setSelectedValue,
  disabled,
}) => {
  const theme = {
    ...DefaultTheme,
    roundness: 100, // Change this value to modify the size
  };
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          //backgroundColor: "blue",
          paddingVertical: 30,
        }}
      >
        <Text style={[styles.question, { width: disabled ? "40%" : "40%" }]}>
          {question}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: !disabled ? "65%" : "65%",
            flexWrap: "wrap",
            // paddingVertical: 10,
            // backgroundColor: "pink",
          }}
        >
          {answers.map((choice, idx) => (
            <RadioButton.Group
              onValueChange={() => setSelectedValue(choice)}
              value={selectedValue}
              key={`multiple-choice-${idx}`}
            >
              <TouchableOpacity
                onPress={() => setSelectedValue(choice)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                disabled={disabled}
              >
                {!disabled && (
                  <RadioButton.Item
                    value={choice}
                    status={choice === selectedValue ? "checked" : "unchecked"}
                  />
                )}
                {disabled && selectedValue === choice ? (
                  <Text style={styles.answer}>{choice}</Text>
                ) : (
                  !disabled && <Text style={styles.answer}>{choice}</Text>
                )}
              </TouchableOpacity>
            </RadioButton.Group>
          ))}
        </View>
      </View>
    </>
  );
};

export default MultipleChoiceQuestion;

const styles = StyleSheet.create({
  question: {
    // alignSelf: "center",
    fontSize: 16,
    fontFamily: "InterMedium",
    // marginTop: 30,
    // backgroundColor: "pink",
  },
  answer: {
    fontSize: 15,
    fontFamily: "InterRegular",
    //marginLeft: -15,
  },
});
