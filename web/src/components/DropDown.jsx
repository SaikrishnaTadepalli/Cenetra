import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MultiSelectQuestion from "./MultiSelectQuestion";

const DropDown = ({
  options,
  selectedOptions,
  setSelectedOptions,
  onSelectAll,
}) => {
  const [isOptionsShown, setIsOptionsShown] = useState(false);
  const onPress = () => {
    setIsOptionsShown(!isOptionsShown);
  };

  return (
    <>
      <TouchableOpacity style={styles.boxContainer} onPress={onPress}>
        <Text style={styles.placeholderText}>Select from dropdown</Text>
        <Ionicons
          name={isOptionsShown ? "caret-up-sharp" : "caret-down-sharp"}
          size={16}
          color="#719792"
        />
      </TouchableOpacity>
      {isOptionsShown && (
        <View style={styles.dropdownContainer}>
          <MultiSelectQuestion
            setCheckedItems={setSelectedOptions}
            checkedItems={selectedOptions}
            answers={options}
            question=""
            onSelectAll={onSelectAll}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: "#D9D9D933",
    width: 270,
    height: 50,
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
  },
  placeholderText: {
    color: "#719792",
    fontFamily: "InterMedium",
    fontSize: 16,
  },
  container: {
    width: "100%",
    padding: 10,
  },
  selectAllButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  selectAllText: {
    fontSize: 16,
    marginLeft: 8,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default DropDown;
