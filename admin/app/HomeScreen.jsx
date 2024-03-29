import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import CreateResponsiveStyle from "../src/components/CreateResponsiveStyle";
import colors from "../src/constants/Colors";
import ProfileScreen from "./ProfileScreen";
import {
  fetchProfile,
  setIsNewProfileAdded,
} from "../src/redux/studentProfileSlice";
import DropDown from "../src/components/DropDown";
import CreateClassScreen from "./CreateClassScreen";
import {
  fetchClasses,
  getisNewClassAdded,
  setIsNewClassAdded,
} from "../src/redux/classSlice";
import { getViewUrl } from "../src/redux/mediaSlice";
import CreateProfileScreen from "./CreateProfileScreen";
import { setClasses } from "../src/redux/authSlice";
import { fetchTeachers } from "../src/redux/teacherSlice";
import TeacherProfileScreen from "./TeacherProfileScreen";

const HomeScreen = () => {
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
  const { loginLoading } = useSelector((state) => state.auth);
  const { fetchClassesSuccessful } = useSelector((state) => state.class);
  const { isNewProfileAdded } = useSelector((state) => state.studentProfile);
  const [studentID, setStudentID] = useState("");
  const [teacherID, setTeacherID] = useState("");
  const [selectedClassInfo, setSelectedClassInfo] = useState("");
  const [teacherProfileInfo, setTeacherProfileInfo] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [error, setError] = useState("");
  const c = localStorage.getItem("classes");
  const c2 = JSON.parse(c);
  const classes = c2 && JSON.parse(c2).classes;
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isCreateClassSelected, setIsCreateClassSelected] = useState(false);
  const [isSelectStudentsSelected, setIsStudentsSelected] = useState(true);
  const [classInfo, setClassInfo] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);
  //console.log(classes);
  // const classInfo = classes.map((item) => ({
  //   key: item._id,
  //   value: item.className,
  //   students: item.students,
  // }));
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const handleCheckboxSelectionForClasses = (input) => {
    // console.log(input, selectedClasses);
    const idx = selectedClasses.findIndex((cls) => cls.key === input.key);
    // console.log(idx);
    const selected = [...selectedClasses];
    if (idx !== -1) {
      selected.splice(idx, 1);
      setSelectedClasses(selected);
      setStudentID("");
      setStudentID("");
      setStudentNumber("");
    } else {
      selected.push(input);
      setSelectedClasses(selected);
    }
  };

  const handleSelectAllForClasses = () => {
    if (classInfo.length === selectedClasses.length) {
      // Deselect all options
      setSelectedClasses([]);
      setStudents([]);
      setStudentID("");
      setStudentID("");
      setStudentNumber("");
    } else {
      // Select all options
      setSelectedClasses(classInfo);
      const allStudents = classInfo.reduce(
        (studentsArr, cls) => [...studentsArr, ...cls.students],
        []
      );
      setStudents(allStudents);
    }
  };

  const onPressDelete = (idx) => {
    const updatedItems = [...selectedClasses];
    updatedItems.splice(idx, 1);
    setStudentID("");
    setStudentID("");
    setStudentNumber("");
    setSelectedClasses(updatedItems);
  };

  const handleCheckboxSelectionForTeachers = (input) => {
    // console.log(input, selectedClasses);
    const idx = selectedTeachers.findIndex((cls) => cls.key === input.key);
    // console.log(idx);
    const selected = [...selectedTeachers];
    if (idx !== -1) {
      selected.splice(idx, 1);
      setSelectedTeachers(selected);
      setStudentID("");
      setStudentID("");
      setStudentNumber("");
    } else {
      selected.push(input);
      setSelectedTeachers(selected);
    }
  };

  const handleSelectAllForTeachers = () => {
    if (teacherInfo.length === selectedTeachers.length) {
      // Deselect all options
      setSelectedTeachers([]);
      setStudentID("");
      setStudentID("");
      setStudentNumber("");
    } else {
      // Select all options
      setSelectedTeachers(teacherInfo);
    }
  };

  const onPressDeleteTeacher = (idx) => {
    const updatedItems = [...selectedTeachers];
    updatedItems.splice(idx, 1);
    setStudentID("");
    setStudentID("");
    setStudentNumber("");
    setSelectedTeachers(updatedItems);
  };

  const handleClick = (studentID, studentName, studentNumber) => {
    //sconsole.log(studentID, studentName, studentNumber);
    setStudentID(studentID);
    setTeacherID("");
    dispatch(setIsNewClassAdded(false));
    setSelectedClassInfo("");
    setStudentName(studentName);
    setStudentNumber(studentNumber);
    setError("");
    dispatch(setIsNewProfileAdded(false));
    dispatch(fetchProfile(studentID))
      .then((response) => {
        if (response.error) {
          if (
            response.payload ===
            "Response status 500: Error while fetching student profile for teacher"
          ) {
            // console.log("-----response-------");
            setError("500");
          }
        } else {
          // console.log(response.payload.profilePic);
          dispatch(getViewUrl(response.payload.profilePic)).then((response) => {
            if (response.error) {
              setError("Error while retrieving image.");
            } else {
              // console.log(response);
              setImageUrl(response.payload.data.getS3ViewUrl);
            }
          });
        }
      })
      .catch((error) => console.error("Error in Profile Screen screen", error));
  };

  const handleClickTeacher = (teacherID, teacherInfo, teacherName) => {
    setTeacherID(teacherID);
    setStudentID("");
    setSelectedClassInfo("");
    teacherInfo.name = teacherName;
    setTeacherProfileInfo(teacherInfo);
  };

  // useEffect(() => {
  //   if (!loginLoading && !isLoggedIn) {
  //     router.push("/LoginScreen");
  //   }
  // }, [router, loginLoading, isLoggedIn]);
  // console.log(localStorage.getItem("students"));
  //console.log(selectedClasses);
  const onPressSelectStudents = () => {
    setTeacherID("");
    setSelectedClassInfo("");
    dispatch(setIsNewClassAdded(false));
    setIsStudentsSelected(true);
    dispatch(fetchClasses())
      .then((response) => {
        if (response.error) {
          setError("Error while fetching classes. Please try again.");
          setTimeout(() => setError(""), 2000);
        } else {
          const classes = response.payload.data.classes;
          dispatch(setClasses(classes));
          const stringifiedDetails = JSON.stringify({ classes })
            .replace(/\\/g, "\\\\") // Escape backslashes
            .replace(/"/g, '\\"');
          localStorage.setItem("classes", `"${stringifiedDetails}"`);
          const classInfo = classes.map((item) => ({
            key: item._id,
            value: item.className,
            students: item.students,
            details: item.details,
            teacher: {
              key: item.teacher._id,
              value: item.teacher.firstName + " " + item.teacher.lastName,
            },
          }));
          setClassInfo(classInfo);
        }
      })
      .catch((error) => {
        setError("Error while fetching classes. Please try again.");
        setTimeout(() => setError(""), 2000);
        console.error(
          "Catch: error while fetching classes in homescreen for admin",
          error
        );
      });
  };

  const onPressSelectTeachers = () => {
    setStudentID("");
    dispatch(setIsNewClassAdded(false));
    // setSelectedClassInfo({});
    setIsStudentsSelected(false);
    dispatch(fetchTeachers())
      .then((response) => {
        if (response.error) {
          setError("Error while fetching teachers. Please try again.");
          setTimeout(() => setError(""), 2000);
        } else {
          const teachers = response.payload.data.teachers;
          const stringifiedDetails = JSON.stringify({ teachers })
            .replace(/\\/g, "\\\\") // Escape backslashes
            .replace(/"/g, '\\"');
          localStorage.setItem("teachers", `"${stringifiedDetails}"`);
          const teacherInfo = teachers.map((item) => ({
            key: item._id,
            value: item.firstName + " " + item.lastName,
            teacherInfo: {
              email: item.email,
              phoneNumber: item.phoneNumber,
              teacherNumber: item.teacherNumber,
            },
          }));
          setTeacherInfo(teacherInfo);
        }
      })
      .catch((error) => {
        setError("Error while fetching teachers. Please try again.");
        setTimeout(() => setError(""), 2000);
        console.error(
          "Catch: error while fetching teachers in homescreen for admin",
          error
        );
      });
  };

  const onPressEdit = (classDetails) => {
    const students = [];
    classDetails.students.forEach((student) => {
      students.push({
        key: student._id,
        value: student.firstName + " " + student.lastName,
      });
    });
    const copyClassDetails = {
      key: classDetails.key,
      details: classDetails.details,
      value: classDetails.value,
      students: students,
      teacher: classDetails.teacher,
    };
    setTeacherID("");
    setSelectedClassInfo(copyClassDetails);
    setStudentID("");
    dispatch(setIsNewClassAdded(true));
  };

  useEffect(() => onPressSelectStudents(), []);
  return (
    <View style={styles("container")}>
      {loginLoading ? (
        <Text style={styles("text")}>Loading details...</Text>
      ) : (
        <>
          <Text style={styles("headerText")}>Class List</Text>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <TouchableOpacity
              style={[styles("createButtonContainer"), { marginRight: 10 }]}
              onPress={onPressSelectStudents}
            >
              <Text style={styles("createButtonText")}>View all students</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles("createButtonContainer")}
              onPress={onPressSelectTeachers}
            >
              <Text style={styles("createButtonText")}>View all teachers</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}>
            {isSelectStudentsSelected ? (
              <DropDown
                options={classInfo}
                selectedOptions={selectedClasses}
                setSelectedOptions={handleCheckboxSelectionForClasses}
                onSelectAll={handleSelectAllForClasses}
                onPressDelete={onPressDelete}
                dropdownText="Select class to view"
              />
            ) : (
              <DropDown
                options={teacherInfo}
                selectedOptions={selectedTeachers}
                setSelectedOptions={handleCheckboxSelectionForTeachers}
                onSelectAll={handleSelectAllForTeachers}
                onPressDelete={onPressDeleteTeacher}
                dropdownText="Select teacher to view"
              />
            )}
          </View>
          {error !== "" && error !== "500" && (
            <Text style={{ color: "red", fontSize: 16, marginVertical: 20 }}>
              {error}
            </Text>
          )}
          {/* <TouchableOpacity
            onPress={onPressCreate}
            style={styles("createButtonContainer}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={20}
              color="#024552"
            />
            <Text style={styles("createButtonText}>Create a class</Text>
          </TouchableOpacity> */}
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              // backgroundColor: "pink",
            }}
          >
            {isSelectStudentsSelected ? (
              <ScrollView
                // contentContainerStyle={styles("listView}
                nestedScrollEnabled={true}
              >
                {selectedClasses &&
                  selectedClasses.map((cls, idx) => (
                    <View key={`class-list=${idx}`}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles("className")}>{cls.value}</Text>
                        <TouchableOpacity
                          onPress={() => onPressEdit(cls)}
                          style={styles("editButtonContainer")}
                        >
                          <MaterialCommunityIcons
                            name="pencil-outline"
                            size={20}
                            color="#024552"
                          />
                          <Text style={styles("editButtonText")}>
                            Edit Class
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {cls.students.map((student, idx) => (
                        <TouchableOpacity
                          style={[
                            styles("cardContainer"),
                            {
                              backgroundColor:
                                student._id === studentID
                                  ? "rgba(187, 157, 191, 0.4)"
                                  : "rgba(217, 217, 217, 0.3)",
                            },
                          ]}
                          key={`name-${idx}`}
                          onPress={() =>
                            handleClick(
                              student._id,
                              student.firstName + " " + student.lastName,
                              student.studentNumber
                            )
                          }
                        >
                          <Text
                            style={[
                              styles("nameText"),
                              {
                                color:
                                  student._id === studentID
                                    ? "#4F0059"
                                    : "#5E5E5E",
                              },
                            ]}
                          >
                            {student.firstName + " " + student.lastName}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
              </ScrollView>
            ) : (
              <ScrollView
                //contentContainerStyle={styles("listView}
                nestedScrollEnabled={true}
              >
                {selectedTeachers &&
                  selectedTeachers.map((teacher, idx) => (
                    <View key={`class-list=${idx}`}>
                      <TouchableOpacity
                        style={[
                          styles("cardContainer"),
                          {
                            backgroundColor:
                              teacher.key === teacherID
                                ? "rgba(187, 157, 191, 0.4)"
                                : "rgba(217, 217, 217, 0.3)",
                          },
                        ]}
                        key={`name-${idx}`}
                        onPress={() =>
                          handleClickTeacher(
                            teacher.key,
                            teacher.teacherInfo,
                            teacher.value
                          )
                        }
                      >
                        <Text
                          style={[
                            styles("nameText"),
                            {
                              color:
                                teacher.key === teacherID
                                  ? "#4F0059"
                                  : "#5E5E5E",
                            },
                          ]}
                        >
                          {teacher.value}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
              </ScrollView>
            )}

            {layout.width >= 768 ? (
              <View style={styles("rightContent")}>
                <View style={styles("verticalDivider")} />
                {/* {error === "500" ? (
                <>
                  {/* {!isNewProfileAdded && (
                    <TouchableOpacity
                      style={styles("createButtonContainer}
                      onPress={handleClick}
                    >
                      <Ionicons name="add" size={20} color="#024552" />
                      <Text
                        style={styles("createButtonText}
                        onPress={onPressCreate}
                      >
                        Add profile
                      </Text>
                    </TouchableOpacity>
                  )}
                  <View style={styles("errorContainer}>
                    <Text style={styles("emptyText}>
                      No profile exists for this student
                    </Text>
                  </View> */}
                {/* </>
              ) :  */}
                <View style={{ paddingLeft: 60, width: "100%" }}>
                  {studentID ? (
                    <ProfileScreen
                      curStudentID={studentID}
                      imageUrl={imageUrl}
                      doesProfileExist={error === "500" ? false : true}
                      studentName={studentName}
                      studentNumber={studentNumber}
                    />
                  ) : null}
                  {teacherID ? (
                    <TeacherProfileScreen
                      teacherID={teacherID}
                      teacherInfo={teacherProfileInfo}
                      // imageUrl={imageUrl}
                      // doesProfileExist={error === "500" ? false : true}
                      // studentName={studentName}
                      // studentNumber={studentNumber}
                    />
                  ) : null}
                  {selectedClassInfo !== {} ? (
                    <CreateClassScreen
                      classInfo={selectedClassInfo}
                      // teacherInfo={teacherProfileInfo}
                      // imageUrl={imageUrl}
                      // doesProfileExist={error === "500" ? false : true}
                      // studentName={studentName}
                      // studentNumber={studentNumber}
                    />
                  ) : null}
                </View>
              </View>
            ) : (
              <>
                {studentID ? (
                  <View style={{ width: studentID ? "100%" : "0%" }}>
                    <ProfileScreen
                      curStudentID={studentID}
                      imageUrl={imageUrl}
                      doesProfileExist={error === "500" ? false : true}
                      studentName={studentName}
                      studentNumber={studentNumber}
                      setStudentID={setStudentID}
                    />
                  </View>
                ) : null}
                {teacherID ? (
                  <View style={{ width: teacherID ? "100%" : "0%" }}>
                    <TeacherProfileScreen
                      teacherID={teacherID}
                      teacherInfo={teacherProfileInfo}
                      setTeacherID={setTeacherID}
                      // imageUrl={imageUrl}
                      // doesProfileExist={error === "500" ? false : true}
                      // studentName={studentName}
                      // studentNumber={studentNumber}
                    />
                  </View>
                ) : null}
                {selectedClassInfo !== {} ? (
                  <CreateClassScreen
                    classInfo={selectedClassInfo}
                    // teacherInfo={teacherProfileInfo}
                    // imageUrl={imageUrl}
                    // doesProfileExist={error === "500" ? false : true}
                    // studentName={studentName}
                    // studentNumber={studentNumber}
                  />
                ) : null}
              </>
            )}
            {/* <View style={{ width: "50%" }}>
              {isNewProfileAdded && (
                <CreateProfileScreen studentID={studentID} isEdit={false} />
              )}
            </View> */}
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const responsiveStyle = CreateResponsiveStyle(
  {
    container: {
      width: "100%",
      alignContent: "center",
      height: "100%",
      paddingLeft: 30,
      //backgroundColor: "red",
    },
    headerText: {
      fontSize: 30,
      fontFamily: "InterBold",
      marginBottom: 34,
      marginTop: 40,
    },
    listView: {
      width: "30%",
      backgroundColor: "pink",
      //marginLeft: 30,
      //flex: 1,
    },
    cardContainer: {
      width: 300,
      height: 50,
      borderRadius: 4,
      justifyContent: "center",
      marginBottom: 10,
      paddingLeft: 10,
    },
    nameText: {
      fontFamily: "InterMedium",
      fontSize: 16,
    },
    className: {
      fontSize: 16,
      fontFamily: "InterSemiBold",
      marginVertical: 20,
    },
    verticalDivider: {
      borderLeftColor: "#D9D9D980",
      borderLeftWidth: 1,
      height: "100%",
    },
    emptyText: {
      fontFamily: "InterSemiBold",
      fontSize: 20,
      color: "#99B8BE",
    },
    errorContainer: {
      height: "100%",
      justifyContent: "center",
      marginBottom: 300,
      alignItems: "center",
    },
    createButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 5,
      marginTop: 20,
      // marginLeft: 50,
      backgroundColor: "#99B8BE99",
      width: 150,
      height: 40,
      borderRadius: 5,
    },
    createButtonText: {
      color: "#024552",
      fontSize: 15,
      fontFamily: "InterSemiBold",
      textAlign: "center",
    },
    editButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 5,
      backgroundColor: "#99B8BE99",
      width: 120,
      height: 30,
      borderRadius: 5,
    },
    editButtonText: {
      color: "#024552",
      fontSize: 14,
      fontFamily: "InterMedium",
      textAlign: "right",
    },
    rightContent: {
      // justifyContent: "space-between",
      flexDirection: "row",
      // backgroundColor: "yellow",
      width: "80%",
      marginTop: "-10%",
      paddingHorizontal: 100,
    },
  },
  {
    container: {
      width: "100%",
    },
    listView: {
      width: "100%",
    },
  }
);
