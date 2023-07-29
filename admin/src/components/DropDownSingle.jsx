import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DropDownSingle = ({
  options,
  selectedOption,
  setSelectedOption,
  dropdownText,
  onPressDelete,
}) => {
  const [isOptionsShown, setIsOptionsShown] = useState(false);

  const onPress = () => {
    setIsOptionsShown(!isOptionsShown);
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <TouchableOpacity style={styles.boxContainer} onPress={onPress}>
        {selectedOption ? (
          <View style={styles.selectedOptionContainer}>
            <TouchableOpacity
              //   onPress={() => onPressDelete()}
              style={styles.selectedOption}
            >
              <Text style={styles.selectedOptionText}>
                {selectedOption.value}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.placeholderText}>{dropdownText}</Text>
        )}
        <Ionicons
          name={isOptionsShown ? "caret-up-sharp" : "caret-down-sharp"}
          size={16}
          color="#719792"
        />
      </TouchableOpacity>
      {isOptionsShown && (
        <ScrollView style={styles.dropdownContainer}>
          {options.map((option, idx) => (
            <TouchableOpacity
              key={`dropdown-option-${idx}`}
              style={styles.optionButton}
              onPress={() => setSelectedOption(option)}
            >
              <Text style={styles.optionText}>{option.value}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: "#D9D9D933",
    width: 270,
    minHeight: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  selectedOptionContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  dropdownContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 0,
    backgroundColor: "#D9D9D933",
    width: 270,
    borderRadius: 10,
    marginTop: 5,
    height: 200,
  },
  placeholderText: {
    color: "#719792",
    fontFamily: "InterMedium",
    fontSize: 16,
  },
  optionButton: {
    paddingHorizontal: 20,
    height: 36,
    // borderColor: "#99B8BE99",
    // borderBottomWidth: 1,
    justifyContent: "center",
  },
  optionText: {
    fontSize: 14,
  },
  selectedOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 36,

    // borderColor: "#99B8BE99",
    // borderBottomWidth: 1,
    justifyContent: "center",
  },
  selectedOptionText: {
    fontSize: 14,
  },
});

export default DropDownSingle;
