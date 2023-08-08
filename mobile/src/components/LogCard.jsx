import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import colors from "../constants/Colors";

const LogCard = ({ sectionHeaderColor, question, answer, type }) => {
  const renderIcon = (name, idx) => (
    <Ionicons
      key={`${name}-${idx}`}
      name={name}
      color={colors.yellow}
      size={24}
      style={{ marginRight: 8 }}
    />
  );

  const renderIcons = (num, name) =>
    [...Array(num).keys()].map((idx) => renderIcon(name, idx));

  return (
    <View style={styles.cardContainer}>
      <View
        style={[
          styles.questionContainer,
          { backgroundColor: sectionHeaderColor },
        ]}
      >
        <Text style={styles.question}>{question}</Text>
      </View>
      {type === "rating" ? (
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          {renderIcons(answer, "star")}
          {renderIcons(7 - answer, "star-outline")}
        </View>
      ) : (
        <View style={styles.answerContainer}>
          {type === "checkbox" ? (
            answer.map((a, idx) => (
              <Text style={styles.answer} key={`check-box-${idx}`}>
                {a}
              </Text>
            ))
          ) : type === "radiobutton" || type === "openended" ? (
            <Text style={styles.answer}>{answer}</Text>
          ) : null}
        </View>
      )}
    </View>
    // <View style={styles.container}>
    //   <Text style={styles.question}>{question}</Text>
    //   <View style={{ flexDirection: "row" }}>
    //     <Ionicons name="radio-button-on" size={24} color="#000" />
    //     <Text style={styles.optionText}>{answer}</Text>
    //   </View>
    // </View>
  );
};

export default LogCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  questionContainer: {
    width: "100%",
    marginBottom: 10,
  },
  question: {
    color: colors.black,
    fontFamily: "InterMedium",
    fontSize: 16,
    textAlign: "left",
    paddingVertical: 8,
  },
  answerContainer: {
    backgroundColor: "#D9D9D933",
    borderColor: "rgba(217, 217, 217, 0.2)",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingVertical: 20,
    width: "100%",
  },
  answer: {
    textAlign: "left",
    marginHorizontal: 10,
    textAlignVertical: "center",
    fontFamily: "InterMedium",
    fontSize: 14,
    color: colors.primaryText,
  },
});
