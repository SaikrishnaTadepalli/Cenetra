import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Checkbox, Provider, DefaultTheme } from "react-native-paper";

const MultiSelectQuestion = ({
  question,
  answers,
  checkedItems,
  setCheckedItems,
  onSelectAll,
  disabled,
}) => {
  // const setChecked = (input) => {
  //   if (input === "select all") {
  //     if (checkedItems.length === answers.length) {
  //       setCheckedItems([]);
  //     } else {
  //       setCheckedItems(answers);
  //     }
  //     return;
  //   }
  //   const idx = checkedItems.indexOf(input);
  //   const selected = [...checkedItems];
  //   if (idx !== -1) {
  //     selected.splice(idx, 1);
  //     setCheckedItems(selected);
  //   } else {
  //     selected.push(input);
  //     setCheckedItems(selected);
  //   }
  // };
  const theme = {
    ...DefaultTheme,
    roundness: 100, // Change this value to modify the size
  };
  return (
    <>
      <Provider theme={theme}>
        <Text style={styles.questionText}>{question}</Text>
        {!disabled && (
          <TouchableOpacity
            style={styles.checkBoxContainer}
            onPress={onSelectAll}
          >
            <Checkbox
              status={
                checkedItems.length === answers.length ? "checked" : "unchecked"
              }
              color="#6750A4"
            />
            <Text style={styles.answerText}>
              {checkedItems.length === answers.length
                ? "Deselect All"
                : "Select All"}
            </Text>
            <View
              style={[
                styles.divider,
                {
                  marginLeft:
                    checkedItems.length === answers.length ? -115 : -98,
                },
              ]}
            />
          </TouchableOpacity>
        )}
        {answers.map((input, idx) => (
          <TouchableOpacity
            style={styles.checkBoxContainer}
            key={`multi-select-${idx}`}
            onPress={() => {
              setCheckedItems(input);
            }}
          >
            {!disabled && (
              <Checkbox
                status={
                  checkedItems.indexOf(input) !== -1 ? "checked" : "unchecked"
                }
                disabled={disabled}
                color="#6750A4"
              />
            )}
            <Text style={styles.answerText}>{input}</Text>
          </TouchableOpacity>
        ))}
      </Provider>
    </>
  );
};

export default MultiSelectQuestion;

const styles = StyleSheet.create({
  questionText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    marginTop: 20,
  },
  answerText: {
    fontSize: 15,
    fontFamily: "InterRegular",
    marginLeft: 10,
  },
  checkBoxContainer: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  divider: {
    width: 240,
    backgroundColor: "black",
    height: 1,
    marginTop: 40,
  },
});
