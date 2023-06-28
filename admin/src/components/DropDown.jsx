import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MultiSelectQuestion from "./MultiSelectQuestion";

const DropDown = ({
  options,
  selectedOptions,
  setSelectedOptions,
  onSelectAll,
  dropdownText,
  onPressDelete,
}) => {
  const [isOptionsShown, setIsOptionsShown] = useState(false);
  const onPress = () => {
    setIsOptionsShown(!isOptionsShown);
  };
  //console.log(selectedOptions);
  return (
    <View style={{ flexDirection: "column" }}>
      <TouchableOpacity style={styles.boxContainer} onPress={onPress}>
        {selectedOptions.length > 0 ? (
          <View style={styles.selectedOptionsContainer}>
            {selectedOptions.map(
              (option, idx) =>
                option && (
                  <TouchableOpacity
                    key={`dropdown-options-${idx}`}
                    onPress={() => onPressDelete(idx)}
                    style={styles.selectedOptionContainer}
                  >
                    <Text style={styles.selectedOptionText}>
                      {option.value}
                    </Text>

                    <MaterialIcons
                      name="clear"
                      size={14}
                      color="black"
                      style={{ marginTop: 2, marginLeft: 5 }}
                    />
                  </TouchableOpacity>
                )
            )}
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
          <MultiSelectQuestion
            setCheckedItems={setSelectedOptions}
            checkedItems={selectedOptions}
            answers={options}
            question=""
            onSelectAll={onSelectAll}
            isDropdown={true}
          />
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
  selectedOptionsContainer: {
    flexWrap: "wrap",
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
    height: 250,
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
  selectedOptionContainer: {
    paddingHorizontal: 10,
    height: 36,
    borderColor: "#99B8BE99",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    marginHorizontal: 5,
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#99B8BE33",
  },
  selectedOptionText: {
    fontSize: 14,
  },
});

export default DropDown;
