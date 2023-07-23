import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewClassAdded } from "../src/redux/classSlice";
import { setIsNewTeacherAdded } from "../src/redux/teacherSlice";
import { setIsNewStudentAdded } from "../src/redux/studentSlice";
import CreateClassScreen from "./CreateClassScreen";
import AddStudentScreen from "./AddStudentScreen";
import AddTeacherScreen from "./AddTeacherScreen";

const CreateScreen = () => {
  const dispatch = useDispatch();
  const buttonOptions = ["Create Class", "Add Teacher", "Add Student"];
  const [activeButton, setActiveButton] = useState(buttonOptions[0]);

  const handleButtonOptions = (idx) => {
    if (idx === 0) {
      dispatch(setIsNewClassAdded(true));
    } else if (idx === 1) {
      dispatch(setIsNewTeacherAdded(true));
    } else if (idx === 2) {
      dispatch(setIsNewStudentAdded(true));
    }
    setActiveButton(buttonOptions[idx]);
  };
  return (
    <>
      <View style={styles.container}>
        {buttonOptions.map((button, idx) => (
          <View
            style={styles.buttonsContainer}
            key={`create-options-idx-${idx}`}
          >
            <TouchableOpacity onPress={() => handleButtonOptions(idx)}>
              <Text
                style={
                  activeButton === button
                    ? styles.activeButtonText
                    : styles.buttonText
                }
              >
                {button}
              </Text>
            </TouchableOpacity>
            {idx !== 2 && <View style={styles.verticalDivider} />}
          </View>
        ))}
      </View>
      <View style={styles.horizontalDivider} />
      {activeButton === buttonOptions[0] && <CreateClassScreen />}
      {activeButton === buttonOptions[1] && <AddTeacherScreen />}
      {activeButton === buttonOptions[2] && <AddStudentScreen />}
    </>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingLeft: 20,
    flexDirection: "row",
  },
  buttonsContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "InterRegular",
  },
  activeButtonText: {
    fontSize: 30,
    fontFamily: "InterSemiBold",
  },
  verticalDivider: {
    height: 35,
    borderWidth: 1,
    borderColor: "#23342C",
    marginHorizontal: 10,
  },
  horizontalDivider: {
    width: "100%",
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: "#D9D9D980",
  },
});
