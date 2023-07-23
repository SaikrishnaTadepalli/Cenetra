import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { createStudent, setIsNewStudentAdded } from "../src/redux/studentSlice";
import { setIsNewProfileAdded } from "../src/redux/studentProfileSlice";
import CreateProfileScreen from "./CreateProfileScreen";

const AddStudentScreen = () => {
  const dispatch = useDispatch();
  const { isNewStudentAdded, createStudentPending } = useSelector(
    (state) => state.student
  );
  const { isNewProfileAdded } = useSelector((state) => state.studentProfile);
  const initialState = {
    firstName: "",
    lastName: "",
    primaryContactNumber: "",
  };
  const [isEditable, setIsEditable] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [studentState, setStudentState] = useState(initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isAddProfileDisabled, setIsAddProfileDisabled] = useState(false);
  const [studentNumber, setStudentNumber] = useState("");
  const [studentInfoState, setStudentInfoState] = useState({
    name: "",
    ID: "",
    number: "",
  });

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
          value={isEditable ? studentState[key] : ""}
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
      //console.log(studentState);
      dispatch(createStudent(studentState))
        .then((response) => {
          //response;
          if (response.error) {
            setError(response.payload.message);
            setTimeout(() => setError(""), 2000);
          } else {
            //console.log(response);
            if (!createStudentPending) {
              setIsSaved(true);
              setIsButtonDisabled(true);
              setIsEditable(false);
              setStudentInfoState({
                name: studentState.firstName + " " + studentState.lastName,
                ID: response.payload.data.createStudent._id,
                number: response.payload.data.createStudent.studentNumber,
              });
              setStudentNumber(
                response.payload.data.createStudent.studentNumber
              );
              setTimeout(() => {
                setIsSaved(false);
                setIsButtonDisabled(false);
                setStudentState(initialState);
                setIsEditable(true);
              }, 2000);
            }
          }
        })
        .catch((error) => {
          setIsButtonDisabled(false);
          setError("Something went wrong please try again.");
          console.error(
            "Catch: Error while creating Student in home screen",
            error
          );
        });
    } else {
      setError("Please fill in all the fields.");
      setTimeout(() => setError(""), 2000);
    }
  };
  const onCancel = () => {
    setIsCancelled(true);
    setStudentState(initialState);
    //dispatch(setIsNewStudentAdded(false));
    //dispatch(setIsNewClassAdded(false));
    setTimeout(() => {
      setIsCancelled(false);
    }, 2000);
  };

  const handleClick = () => {
    if (studentInfoState.ID === "") {
      setError("Please create a student before adding a profile.");
      setTimeout(() => setError(""), 3000);
    } else {
      dispatch(setIsNewProfileAdded(true));
      setStudentNumber("");
    }
  };
  return (
    <View style={styles.container}>
      {isNewStudentAdded && (
        <>
          <View>
            <Text style={styles.subHeaderText}>Student details</Text>
            {renderText("Student first name", "firstName")}
            {renderText("Student last name", "lastName")}
            {renderText("Parent phone number", "primaryContactNumber")}
            {isSaved ? <Text>Student has been added successfully!</Text> : null}
            {error !== "" ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}
            {createStudentPending && <Text>Adding student...</Text>}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.saveButtonContainer,
                  { opacity: isButtonDisabled ? 0.5 : 1 },
                ]}
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
            <TouchableOpacity
              style={
                isAddProfileDisabled
                  ? [styles.buttonContainer, styles.disabled]
                  : styles.buttonContainer
              }
              onPress={handleClick}
              disabled={isAddProfileDisabled}
            >
              <Ionicons name="add" size={20} color="#024552" />
              <Text style={styles.buttonText} onPress={handleClick}>
                Add a profile
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verticalDivider} />
          <View
            style={{
              width: "50%",
              height: "30%",
              marginTop: 50,
              marginLeft: 100,
            }}
          >
            <>
              {studentInfoState.ID !== "" && isNewProfileAdded ? (
                <CreateProfileScreen
                  studentID={studentInfoState.ID}
                  studentName={studentInfoState.name}
                  studentNumber={studentInfoState.number}
                  isEdit={false}
                />
              ) : null}
              {studentNumber && (
                <Text style={styles.studentNumberText}>
                  The student number is: {studentNumber}
                </Text>
              )}
            </>
          </View>
        </>
      )}
    </View>
  );
};

export default AddStudentScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 40,
    marginTop: 20,
    flexDirection: "row",
    height: "100%",
    width: "100%",
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
    width: "50%",
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
  verticalDivider: {
    borderLeftColor: "#D9D9D980",
    borderLeftWidth: 1,
    // marginRight: 50,
    marginLeft: 60,
  },
  buttonContainer: {
    marginVertical: 20,
    backgroundColor: "#99B8BE99",
    height: 40,
    width: 132,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // alignSelf: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    alignSelf: "center",
    color: "#024552",
    fontWeight: 600,
  },
  studentNumberText: {
    fontSize: 18,
    fontFamily: "InterMedium",
  },
});
