import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";

const MultiSelectQuestion = ({
  question,
  answers,
  checkedItems,
  setCheckedItems,
}) => {
  const setChecked = (input) => {
    if (input === "select all") {
      if (checkedItems.length === answers.length) {
        setCheckedItems([]);
      } else {
        setCheckedItems(answers);
      }
      return;
    }
    const idx = checkedItems.indexOf(input);
    const selected = [...checkedItems];
    if (idx !== -1) {
      selected.splice(idx, 1);
      setCheckedItems(selected);
    } else {
      selected.push(input);
      setCheckedItems(selected);
    }
  };
  return (
    <>
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.checkBoxContainer}>
        <Checkbox
          status={
            checkedItems.length === answers.length ? "checked" : "unchecked"
          }
          onPress={() => {
            setChecked("select all");
          }}
        />
        <Text>Select All</Text>
      </View>
      {answers.map((input, idx) => (
        <View style={styles.checkBoxContainer} key={`multi-select-${idx}`}>
          <Checkbox
            status={
              checkedItems.indexOf(input) !== -1 ? "checked" : "unchecked"
            }
            onPress={() => {
              setChecked(input);
            }}
          />
          <Text style={styles.answerText}>{input}</Text>
        </View>
      ))}
    </>
  );
};

export default MultiSelectQuestion;

const styles = StyleSheet.create({
  questionText: {
    fontSize: 18,
    fontWeight: 600,
  },
  answerText: {},
  checkBoxContainer: {
    marginLeft: 40,
    flexDirection: "row",
    alignItems: "center",
  },
});
