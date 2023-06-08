import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

import colors from "../constants/Colors";

const OpenEndedQuestion = ({ inputs, handleInputChange }) => {
  return (
    <View>
      {inputs
        ? inputs.map((input, idx) => (
            <View>
              <Text>{input.name}</Text>
              <TextInput
                style={styles.cardContainer}
                multiline
                editable={true}
                numberOfLines={4}
                maxLength={200}
                key={input.name}
                value={input.value}
                onChangeText={(value) => handleInputChange(idx, value)}
              />
            </View>
          ))
        : null}
    </View>
  );
};

export default OpenEndedQuestion;

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: 60,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
});
