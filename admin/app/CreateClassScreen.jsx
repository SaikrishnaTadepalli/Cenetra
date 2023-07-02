import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudentsToClass,
  createClass,
  createTeacher,
  fetchClasses,
  setIsNewClassAdded,
} from "../src/redux/classSlice";
import DropDown from "../src/components/DropDown";
import { SelectList } from "react-native-dropdown-select-list";
import { fetchTeachers } from "../src/redux/teacherSlice";
import { Ionicons } from "@expo/vector-icons";
import { fetchStudents } from "../src/redux/studentSlice";
import { setClasses } from "../src/redux/authSlice";

const CreateClassScreen = () => {
  const dispatch = useDispatch();
  const {
    isNewClassAdded,
    addStudentsToClassPending,
    createClassPending,
    fetchClassesPending,
  } = useSelector((state) => state.class);
  const [error, setError] = useState("");
  const [classState, setClassState] = useState({
    name: "",
    details: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const renderText = (infoType, key, state, setState) => {
    return (
      <View style={styles.infoLineContainer}>
        {infoType !== "" ? (
          <Text style={styles.infoTypeText}>{infoType}</Text>
        ) : null}
        <TextInput
          editable={true}
          style={styles.infoInputText}
          value={classState.info}
          onChangeText={(value) => handleChange(key, value, state, setState)}
        />
      </View>
    );
  };

  const handleCheckboxSelectionForStudents = (input) => {
    const idx = selectedStudents.indexOf(input);
    const selected = [...selectedStudents];
    if (idx !== -1) {
      selected.splice(idx, 1);
      setSelectedStudents(selected);
    } else {
      selected.push(input);
      setSelectedStudents(selected);
    }
  };

  const onPressDelete = (idx) => {
    const updatedItems = [...selectedStudents];
    updatedItems.splice(idx, 1);
    setSelectedStudents(updatedItems);
  };

  const handleSelectAllForStudents = () => {
    if (students.length === selectedStudents.length) {
      // Deselect all options
      setSelectedStudents([]);
    } else {
      // Select all options
      setSelectedStudents(students);
    }
  };

  const handleChange = (key, value, state, setState) => {
    //console.log(key, value);
    setState({
      ...state,
      [key]: value,
    });
  };

  const areAllFieldsFilled = (state) => {
    return Object.values(state).every((value) => value !== "");
  };

  const onSave = () => {
    if (areAllFieldsFilled(classState)) {
      dispatch(
        createClass({ details: classState.details, teacherID: selectedTeacher })
      )
        .then((response) => {
          if (response.error) {
            setError(
              "Something went wrong while creating a class please try again."
            );
          } else {
            console.log(response);
            setIsButtonDisabled(true);
            const classID = response.payload.data.createClass._id;
            const studentIDs = selectedStudents.map((student) => student.key);
            dispatch(
              addStudentsToClass({ classID, studentIDs: studentIDs })
            ).then((response) => {
              if (response.error) {
                setError(
                  "Something went wrong while adding a student to a class please try again."
                );
                setIsButtonDisabled(false);
                return;
              } else {
                dispatch(fetchClasses())
                  .then((response) => {
                    if (response.error) {
                      console.error(
                        "error while fetching classes after creating a new class"
                      );
                      setError("Something went wrong please try again.");
                      setIsButtonDisabled(false);
                      return;
                    } else {
                      localStorage.removeItem("classes");
                      const classes = response.payload.data.classes;
                      dispatch(setClasses(classes));
                      const stringifiedDetails = JSON.stringify({ classes })
                        .replace(/\\/g, "\\\\") // Escape backslashes
                        .replace(/"/g, '\\"');
                      localStorage.setItem(
                        "classes",
                        `"${stringifiedDetails}"`
                      );
                      setIsButtonDisabled(true);
                      setIsSaved(true);
                      setIsCancelled(false);
                      setTimeout(() => {
                        setIsSaved(false);
                      }, 2000);
                    }
                  })
                  .catch((error) => {
                    console.error("Catch: error while fetching classes", error);
                    setError("Something went wrong please try again.");
                  });
              }
            });
          }
        })
        .catch((error) => {
          console.error(
            "Catch: Error while creating class in home screen",
            error
          );
          setError("Error while creating a class");
        });
    } else {
      setError("Please fill in all the fields.");
      setTimeout(() => setError(""), 2000);
    }
  };

  const onCancel = () => {
    setIsCancelled(true);
    dispatch(setIsNewClassAdded(false));
    setTimeout(() => {
      setIsCancelled(false);
    }, 2000);
  };

  const retrieveData = () => {
    dispatch(fetchTeachers()).then((response) => {
      if (response.error) {
        setError("Error while fetching teachers, please try again.");
      } else {
        //console.log("fetch");
        const teacherInfo = response.payload.data.teachers;
        const newTeachers = teacherInfo.map((teacher) => ({
          key: `"${teacher._id}"`,
          value: teacher.firstName + " " + teacher.lastName,
        }));
        setTeachers(newTeachers);
      }
    });
    dispatch(fetchStudents()).then((response) => {
      if (response.error) {
        setError("Error while fetching students, please try again.");
      } else {
        //console.log("fetch 2");
        const studentInfo = response.payload.data.students;
        const newStudents = studentInfo.map((student) => ({
          key: `"${student._id}"`,
          value: student.firstName + " " + student.lastName,
        }));
        setStudents(newStudents);
      }
    });
  };

  useEffect(() => retrieveData(), []);
  return (
    <View style={{ paddingLeft: 40, marginTop: 30 }}>
      {isNewClassAdded && (
        <>
          <Text style={styles.subHeaderText}>Class details</Text>
          {renderText("Name of class", "name", classState, setClassState)}
          {renderText("Details of class", "details", classState, setClassState)}
          <View style={styles.infoLineContainer}>
            <Text style={styles.infoTypeText}>Add students</Text>
            <DropDown
              options={students}
              selectedOptions={selectedStudents}
              setSelectedOptions={handleCheckboxSelectionForStudents}
              onSelectAll={handleSelectAllForStudents}
              onPressDelete={onPressDelete}
              dropdownText="Select from dropdown"
            />
          </View>
          <View style={styles.infoLineContainer}>
            <Text style={styles.infoTypeText}>Add Teacher</Text>
            <SelectList
              setSelected={(val) => setSelectedTeacher(val)}
              // onSelect={retrieveData()}
              data={teachers}
              save="key"
              boxStyles={styles.boxContainer}
              placeholder="Select from dropdown"
              inputStyles={styles.selectedOptionsContainer}
              dropdownStyles={styles.dropdownContainer}
              dropdownTextStyles={styles.dropdownItem}
              arrowicon={
                <Ionicons name={"caret-down-sharp"} size={16} color="#719792" />
              }
              closeicon={
                <Ionicons name={"caret-up-sharp"} size={16} color="#719792" />
              }
              searchPlaceholder="Search for teacher"
            />
          </View>
          {isSaved ? (
            <Text>Your class have been created successfully!</Text>
          ) : null}
          {(addStudentsToClassPending ||
            createClassPending ||
            fetchClassesPending) && (
            <Text>Your class is being created....</Text>
          )}
          {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.saveButtonContainer,
                { opacity: isButtonDisabled ? 0.5 : 1 },
              ]}
              onPress={onSave}
              disabled={isButtonDisabled}
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

export default CreateClassScreen;

const styles = StyleSheet.create({
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
