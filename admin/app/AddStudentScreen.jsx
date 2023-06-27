import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStudent, setIsNewStudentAdded } from "../src/redux/studentSlice";

const AddStudentScreen = () => {
  const dispatch = useDispatch();
  const { isNewStudentAdded, createStudentPending } = useSelector(
    (state) => state.student
  );
  const [studentState, setStudentState] = useState({
    firstName: "",
    lastName: "",
    primaryContactNumber: "",
  });
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const areAllFieldsFilled = () => {
    return Object.values(studentState).every((value) => value !== "");
  };

  const renderText = (infoType, key) => {
    return (
      <View style={styles.infoLineContainer}>
        {infoType !== "" ? (
          <Text style={styles.infoTypeText}>{infoType}</Text>
        ) : null}
        <TextInput
          editable={true}
          style={styles.infoInputText}
          value={studentState.info}
          onChangeText={(value) => handleChange(key, value)}
        />
      </View>
    );
  };

  const handleChange = (key, value) => {
    setStudentState({
      ...studentState,
      [key]: value,
    });
  };

  const onSave = () => {
    if (areAllFieldsFilled(studentState)) {
      console.log(studentState);
      dispatch(createStudent(studentState))
        .then((response) => {
          if (response.error) {
            setError(response.error);
            setTimeout(() => setError(""), 2000);
          } else {
            dispatch(setIsNewStudentAdded(false));
            if (!createStudentPending) {
              setIsSaved(true);
              setTimeout(() => setIsSaved(false), 2000);
            }
          }
        })
        .catch((error) =>
          console.error(
            "Catch: Error while creating Student in home screen",
            error
          )
        );
    } else {
      setError("Please fill in all the fields.");
      setTimeout(() => setError(""), 2000);
    }
  };
  const onCancel = () => {
    setIsCancelled(true);
    dispatch(setIsNewStudentAdded(false));
    //dispatch(setIsNewClassAdded(false));
    setTimeout(() => {
      setIsCancelled(false);
    }, 2000);
  };
  return (
    <View style={{ paddingLeft: 40 }}>
      {isSaved ? <Text>Student has been added successfully!</Text> : null}
      {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
      {createStudentPending && <Text>Student is being added.</Text>}
      {isNewStudentAdded && (
        <>
          <Text style={styles.headerText}>Add Student</Text>
          <Text style={styles.subHeaderText}>Student details</Text>
          {renderText("Student first name", "firstName")}
          {renderText("Student last name", "lastName")}
          {renderText("Parent phone number", "primaryContactNumber")}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.saveButtonContainer}
              onPress={onSave}
            >
              <Text style={styles.saveButtonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButtonContainer}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default AddStudentScreen;

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 24,
    fontSize: 48,
    fontFamily: "InterBold",
    marginTop: 60,
  },
  subHeaderText: {
    marginBottom: 24,
    fontSize: 20,
    fontFamily: "InterBold",
  },
  infoLineContainer: {
    flexDirection: "row",
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
  },
  infoTypeText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    width: "12%",
    // marginRight: 40,
  },
  infoInputText: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 40,
    width: 230,
    paddingVertical: 10,
    borderColor: "rgba(217, 217, 217, 0.50)",
    borderBottomColor: "#D9D9D9",
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginRight: 100,
  },
  saveButtonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 40,
    backgroundColor: "#23342C",
    borderRadius: 100,
    marginRight: 10,
  },
  cancelButtonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 40,
    backgroundColor: "white",
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 1,
  },
  saveButtonText: {
    alignSelf: "center",
    color: "white",
    fontFamily: "InterMedium",
    fontSize: 14,
  },
  cancelButtonText: {
    color: "black",
    fontSize: 14,
    fontFamily: "InterMedium",
    fontFamily: "InterBold",
  },
  errorText: {
    color: "red",
    marginTop: 20,
    fontSize: 14,
    //alignSelf: "center",
  },
});
