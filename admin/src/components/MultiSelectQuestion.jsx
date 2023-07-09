import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Checkbox, Provider, DefaultTheme } from "react-native-paper";

const MultiSelectQuestion = ({
  question,
  answers,
  checkedItems,
  setCheckedItems,
  onSelectAll,
  disabled,
  isDropdown,
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
  //console.log(answers);
  return (
    <>
      <Provider theme={theme}>
        <Text style={styles.questionText}>{question}</Text>
        {!disabled && (
          <View style={styles.checkBoxContainer}>
            <Checkbox
              status={
                checkedItems.length === answers.length ? "checked" : "unchecked"
              }
              onPress={onSelectAll}
              color="#6750A4"
            />
            <Text>
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
          </View>
        )}
        <ScrollView contentContainerStyle={{ height: "100" }}>
          {answers.map((input, idx) => (
            <View style={styles.checkBoxContainer} key={`multi-select-${idx}`}>
              {!disabled && (
                <Checkbox
                  status={
                    checkedItems.findIndex(
                      (item) =>
                        (isDropdown && item.key === input.key) ||
                        (!isDropdown && item === input)
                    ) !== -1
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    setCheckedItems(input);
                  }}
                  disabled={disabled}
                  color="#6750A4"
                />
              )}

              <Text style={styles.answerText}>
                {isDropdown ? input.value : input}
              </Text>
            </View>
          ))}
        </ScrollView>
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
