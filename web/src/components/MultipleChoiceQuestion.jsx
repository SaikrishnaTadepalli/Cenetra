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
  headerText,
  choices,
  selectedValue,
  setSelectedValue,
}) => {
  const theme = {
    ...DefaultTheme,
    roundness: 100, // Change this value to modify the size
  };
  return (
    <>
      <PaperProvider theme={theme}>
        <Text style={styles.headerText}>{headerText}</Text>
        {choices.map((choice, idx) => (
          <RadioButton.Group
            onValueChange={(value) => setSelectedValue(value)}
            value={selectedValue}
            key={`multiple-choice-${idx}`}
          >
            <TouchableOpacity
              onPress={() => setSelectedValue(choice)}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton.Item
                value={choice}
                status={choice === selectedValue ? "checked" : "unchecked"}
              />
              <Text>{choice}</Text>
            </TouchableOpacity>
          </RadioButton.Group>
        ))}
      </PaperProvider>
    </>
  );
};

export default MultipleChoiceQuestion;

const styles = StyleSheet.create({
  headerText: {
    // alignSelf: "center",
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 20,
  },
});
