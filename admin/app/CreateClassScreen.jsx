import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudentsToClass,
  createClass,
  createTeacher,
  fetchClasses,
  removeStudentsFromClass,
  setIsNewClassAdded,
} from "../src/redux/classSlice";
import DropDown from "../src/components/DropDown";
import { SelectList } from "react-native-dropdown-select-list";
import { changeTeacher, fetchTeachers } from "../src/redux/teacherSlice";
import { Ionicons } from "@expo/vector-icons";
import { fetchStudents } from "../src/redux/studentSlice";
import { setClasses } from "../src/redux/authSlice";
import DropDownSingle from "../src/components/DropDownSingle";

const CreateClassScreen = ({ classInfo }) => {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const {
    isNewClassAdded,
    addStudentsToClassPending,
    createClassPending,
    fetchClassesPending,
  } = useSelector((state) => state.class);

  const [error, setError] = useState("");
  const initialState = {
    name: classInfo ? classInfo.value : "",
    details: classInfo ? classInfo.details : "",
  };
  const [classState, setClassState] = useState(initialState);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const placeholderText = "Select from dropdown";
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const renderText = (infoType, key, state, setState) => {
    return (
      <View style={styles.infoLineContainer}>
        <Text style={[styles.infoTypeText]}>{infoType}</Text>
        {classInfo ? (
          <Text>{classState[key]}</Text>
        ) : (
          <TextInput
            editable={true}
            style={styles.infoInputText}
            value={classState[key] || ""}
            onChangeText={(value) => handleChange(key, value, state, setState)}
          />
        )}
      </View>
    );
  };

  const getInputValue = (input) => {
    // console.log("-----------------------------");
    // console.log(
    //   input.key.charAt(0) === '"' ? input.key.slice(1, -1) : input.key
    // );
    return input.key.charAt(0) === '"' ? input.key.slice(1, -1) : input.key;
  };

  const handleCheckboxSelectionForStudents = (input) => {
    // console.log(getInputValue(input), selectedStudents);
    // console.log(selectedStudents[0].key);
    const idx = selectedStudents.findIndex(
      (item) => getInputValue(item) === getInputValue(input)
    );
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

  const handleDispatch = () => {
    dispatch(
      createClass({
        details: classState.details,
        teacherID: selectedTeacher.key,
        className: classState.name,
      })
    )
      .then((response) => {
        if (response.error) {
          setError(
            "Something went wrong while creating a class please try again."
          );
          setTimeout(() => setError(""), 2000);
        } else {
          // console.log(response);
          setIsButtonDisabled(true);
          const classID = classID || response.payload.data.createClass._id;
          const studentIDs = selectedStudents.map((student) => student.key);
          addStudents(classID, studentIDs);
        }
      })
      .catch((error) => {
        console.error(
          "Catch: Error while creating class in home screen",
          error
        );
        setError("Error while creating a class");
        setTimeout(() => setError(""), 2000);
      });
  };
  const haveSameElements = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false; // If the arrays have different lengths, they are not the same
    }

    return arr1.every((item) => arr2.includes(item));
  };
  const fetchClass = () => {
    dispatch(fetchClasses())
      .then((response) => {
        if (response.error) {
          console.error(
            "error while fetching classes after creating a new class"
          );
          setError("Something went wrong please try again.");
          setTimeout(() => setError(""), 2000);
          setIsButtonDisabled(false);
          return;
        } else {
          localStorage.removeItem("classes");
          const classes = response.payload.data.classes;
          dispatch(setClasses(classes));
          const stringifiedDetails = JSON.stringify({ classes })
            .replace(/\\/g, "\\\\") // Escape backslashes
            .replace(/"/g, '\\"');
          localStorage.setItem("classes", `"${stringifiedDetails}"`);
          setIsButtonDisabled(true);
          setIsSaved(true);
          setClassState(initialState);

          setSelectedStudents([]);
          setSelectedTeacher("");
          setIsCancelled(false);
          setTimeout(() => {
            setIsSaved(false);
            classInfo && dispatch(setIsNewClassAdded(false));
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Catch: error while fetching classes", error);
        setError("Something went wrong please try again.");
        setTimeout(() => setError(""), 2000);
      });
  };
  const addStudents = (classID, studentIDs) => {
    dispatch(addStudentsToClass({ classID, studentIDs: studentIDs }))
      .then((response) => {
        if (response.error) {
          setError(
            "Something went wrong while adding a student to a class please try again."
          );
          setTimeout(() => setError(""), 2000);
          setIsButtonDisabled(false);
          return;
        } else {
          setIsButtonDisabled(true);
          fetchClass();
        }
      })
      .catch((err) => {
        console.error("Error while adding students to the class", err);
        setError("Something went wrong please try again.");
        setTimeout(() => setError(""), 2000);
      });
  };

  const removeStudents = (classID, studentIDs, studentsToAddIDs) => {
    dispatch(removeStudentsFromClass({ classID, studentIDs: studentIDs }))
      .then((response) => {
        if (response.error) {
          setError(
            "Something went wrong while adding a student to a class please try again."
          );
          setTimeout(() => setError(""), 2000);
          setIsButtonDisabled(false);
          return;
        } else {
          setIsButtonDisabled(true);
          if (studentsToAddIDs.length > 0) {
            addStudents(classInfo.key, studentsToAddIDs);
          } else {
            fetchClass();
          }
        }
      })
      .catch((err) => {
        console.error("Error while adding students to the class", err);
        setError("Something went wrong please try again.");
        setTimeout(() => setError(""), 2000);
      });
  };

  const onSave = () => {
    var newAction = "";
    if (selectedStudents.length === 0) {
      setError("There must be at least one student in the class.");
      setTimeout(() => setError(""), 2000);
    } else {
      if (areAllFieldsFilled(classState)) {
        if (classInfo) {
          if (classInfo.teacher.key !== selectedTeacher.key) {
            setIsButtonDisabled(true);
            dispatch(
              changeTeacher({
                teacherID: classInfo.teacher.key,
                classID: classInfo.key,
              })
            ).then((response) => {
              if (response.error) {
                setError(
                  "Something went wrong while changing the teacher. Please try again."
                );
                setTimeout(() => setError(""), 2000);
              }
            });
          }
          console.log("Some student");
          const studentsToRemove = classInfo.students.filter(
            (student) => !selectedStudents.some((s) => s.key === student.key)
          );
          const studentsToRemoveIDs = studentsToRemove.map(
            (student) => `"${student.key}"`
          );
          const studentsToAdd = selectedStudents.filter(
            (student) => !classInfo.students.some((s) => s.key === student.key)
          );
          const studentsToAddIDs = studentsToAdd.map((student) => student.key);
          studentsToRemoveIDs.length > 0 &&
            removeStudents(
              classInfo.key,
              studentsToRemoveIDs,
              studentsToAddIDs
            );
          console.log(error);
          if (
            error === "" &&
            studentsToAddIDs.length > 0 &&
            studentsToRemoveIDs.length === 0
          ) {
            console.log("addstudnets");
            addStudents(classInfo.key, studentsToAddIDs);
          }
        } else {
          newAction = createClass({
            details: classState.details,
            teacherID: selectedTeacher,
            className: classState.name,
          });
          handleDispatch(newAction, classState.name);
        }
        // handleDispatch(newAction, classInfo.key);
      } else {
        setError("Please fill in all the fields.");
        setTimeout(() => setError(""), 2000);
      }
    }
  };

  useEffect(() => {
    // Check if classInfo is not empty and then update the state
    if (
      classInfo !== "" &&
      classInfo !== null &&
      typeof classInfo === "object"
    ) {
      setClassState({
        name: classInfo.value,
        details: classInfo.details || "", // If details property is missing, set it as an empty string
      });
      // console.log(classInfo.students);
      const students2 = classInfo.students.map((student) => ({
        key: getInputValue(student),
        value: student.value,
      }));
      // console.log(students2);
      setSelectedStudents(students2);
      setSelectedTeacher(classInfo.teacher);
    }
  }, [classInfo]);

  const onCancel = () => {
    setIsCancelled(true);
    setClassState(initialState);
    setSelectedStudents([]);
    setSelectedTeacher("");
    setIsButtonDisabled(false);
    setError("");
    classInfo && dispatch(setIsNewClassAdded(false));
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
    <View
      style={{
        paddingLeft: layout.width >= 768 ? 40 : 0,
        marginTop: 30,
      }}
    >
      {isNewClassAdded && (
        <>
          <Text style={styles.subHeaderText}>Class details</Text>
          {renderText("Name", "name", classState, setClassState)}
          {renderText("Details", "details", classState, setClassState)}
          <View style={styles.infoLineContainer}>
            <Text
              style={[
                styles.infoTypeText,
                { width: layout.width >= 768 ? "20%" : "25%" },
              ]}
            >
              Add students
            </Text>
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
            <Text
              style={[
                styles.infoTypeText,
                { width: layout.width >= 768 ? "20%" : "25%" },
              ]}
            >
              Add Teacher
            </Text>
            {/* <SelectList
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
              search={false}
            /> */}
            <DropDownSingle
              options={teachers}
              setSelectedOption={setSelectedTeacher}
              selectedOption={selectedTeacher}
              dropdownText="Select from dropdown"
            />
          </View>
          {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
          {isSaved ? (
            <Text>Your class has been created successfully!</Text>
          ) : null}
          {addStudentsToClassPending ||
            createClassPending ||
            (fetchClassesPending && (
              <Text>Your class is being created....</Text>
            ))}
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
    width: "15%",
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
