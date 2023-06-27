import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTeacher, setIsNewTeacherAdded } from "../src/redux/teacherSlice";

const AddTeacherScreen = () => {
  const dispatch = useDispatch();
  const { isNewTeacherAdded, createTeacherPending } = useSelector(
    (state) => state.teacher
  );
  const [teacherState, setTeacherState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const areAllFieldsFilled = () => {
    return Object.values(teacherState).every((value) => value !== "");
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
          value={teacherState.info}
          onChangeText={(value) => handleChange(key, value)}
        />
      </View>
    );
  };

  const handleChange = (key, value) => {
    setTeacherState({
      ...teacherState,
      [key]: value,
    });
  };

  const onSave = () => {
    if (areAllFieldsFilled(teacherState)) {
      console.log(teacherState);
      dispatch(createTeacher(teacherState))
        .then((response) => {
          if (response.error) {
            setError(response.error);
            setTimeout(() => setError(""), 2000);
          } else {
            dispatch(setIsNewTeacherAdded(false));
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
          }
        })
        .catch((error) =>
          console.error(
            "Catch: Error while creating teacher in home screen",
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
    dispatch(setIsNewTeacherAdded(false));
    //dispatch(setIsNewClassAdded(false));
    setTimeout(() => {
      setIsCancelled(false);
    }, 2000);
  };
  return (
    <View style={{ paddingLeft: 40 }}>
      {isSaved ? <Text>Teacher has been added successfully!</Text> : null}
      {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
      {createTeacherPending && <Text>Teacher is being added.</Text>}
      {isNewTeacherAdded && (
        <>
          <Text style={styles.headerText}>Add teacher</Text>
          <Text style={styles.subHeaderText}>Teacher details</Text>
          {renderText("Teacher first name", "firstName")}
          {renderText("Teacher last name", "lastName")}
          {renderText("Phone number", "phoneNumber")}
          {renderText("Email", "email")}

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

export default AddTeacherScreen;

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
  teacherButtonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    minWidth: 120,
    paddingHorizontal: 20,
    backgroundColor: "#23342C",
    borderRadius: 100,
    marginRight: 10,
  },
  teacherButtonText: {
    alignSelf: "center",
    color: "white",
    fontFamily: "InterMedium",
    fontSize: 14,
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
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginRight: 100,
  },
  errorText: {
    color: "red",
    marginTop: 20,
    fontSize: 14,
    //alignSelf: "center",
  },
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
    color: "#719792",
    fontFamily: "InterMedium",
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
    paddingBottom: 20,
  },
  dropdownItem: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: "InterRegular",
  },
});
