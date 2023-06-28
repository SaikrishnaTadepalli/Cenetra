import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../src/constants/Colors";
import ProfileScreen from "./ProfileScreen";
import { fetchProfile } from "../src/redux/studentProfileSlice";
import DropDown from "../src/components/DropDown";
import CreateClassScreen from "./CreateClassScreen";
import {
  getisNewClassAdded,
  setIsNewClassAdded,
} from "../src/redux/classSlice";

const HomeScreen = () => {
  const { loginLoading } = useSelector((state) => state.auth);
  const [studentID, setStudentID] = useState("");
  const [error, setError] = useState("");
  const c = localStorage.getItem("classes");
  const c2 = JSON.parse(c);
  const classes = c2 && JSON.parse(c2).classes;
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [isCreateClassSelected, setIsCreateClassSelected] = useState(false);
  //console.log(classes);
  const classInfo = classes.map((item) => ({
    key: item._id,
    value: item.details,
    students: item.students,
  }));
  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleCheckboxSelectionForClasses = (input) => {
    // console.log(input, selectedClasses);
    const idx = selectedClasses.findIndex((cls) => cls.key === input.key);
    // console.log(idx);
    const selected = [...selectedClasses];
    if (idx !== -1) {
      selected.splice(idx, 1);
      setSelectedClasses(selected);
      setStudentID("");
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
    setSelectedClasses(updatedItems);
  };

  const onPressCreate = () => {
    dispatch(setIsNewClassAdded(true));
    setIsCreateClassSelected(true);
    setStudentID("");
  };

  const handleClick = (studentID) => {
    // console.log(studentID);
    setStudentID(studentID);
    setError("");
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
        }
      })
      .catch((error) => console.log("Error in Profile Screen screen", error));
  };

  // useEffect(() => {
  //   if (!loginLoading && !isLoggedIn) {
  //     router.push("/LoginScreen");
  //   }
  // }, [router, loginLoading, isLoggedIn]);
  // console.log(localStorage.getItem("students"));
  //console.log(selectedClasses);
  return (
    <View style={styles.container}>
      {loginLoading ? (
        <Text style={styles.text}>Loading details...</Text>
      ) : (
        <>
          <Text style={styles.headerText}>Class List</Text>
          <DropDown
            options={classInfo}
            selectedOptions={selectedClasses}
            setSelectedOptions={handleCheckboxSelectionForClasses}
            onSelectAll={handleSelectAllForClasses}
            onPressDelete={onPressDelete}
            dropdownText="Select class to view"
          />
          {/* <TouchableOpacity
            onPress={onPressCreate}
            style={styles.createButtonContainer}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={20}
              color="#024552"
            />
            <Text style={styles.createButtonText}>Create a class</Text>
          </TouchableOpacity> */}
          <View style={{ flexDirection: "row", height: "100%" }}>
            <ScrollView
              contentContainerStyle={styles.listView}
              nestedScrollEnabled={true}
            >
              {selectedClasses &&
                selectedClasses.map((cls, idx) => (
                  <View key={`class-list=${idx}`}>
                    <Text style={styles.className}>{cls.value}</Text>
                    {cls.students.map((student, idx) => (
                      <TouchableOpacity
                        style={[
                          styles.cardContainer,
                          {
                            backgroundColor:
                              student._id === studentID
                                ? "rgba(187, 157, 191, 0.4)"
                                : "rgba(217, 217, 217, 0.3)",
                          },
                        ]}
                        key={`name-${idx}`}
                        onPress={() => handleClick(student._id)}
                      >
                        <Text
                          style={[
                            styles.nameText,
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
            <View
              style={{
                flexDirection: "row",
                height: "100%",
                width: "50%",
                marginTop: -45,
              }}
            >
              <View style={styles.verticalDivider} />
              {error === "500" ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.emptyText}>
                    No profile exists for this student
                  </Text>
                </View>
              ) : studentID ? (
                <ProfileScreen curStudentID={studentID} />
              ) : null}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // width: "80%",
    //height: "100%",
    paddingLeft: 30,
    // backgroundColor: "red",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "InterBold",
    marginBottom: 34,
    marginTop: 40,
  },
  listView: {
    width: "30%",
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
    marginRight: 50,
    marginLeft: "-45%",
    marginTop: "-10%",
  },
  emptyText: {
    fontFamily: "InterSemiBold",
    fontSize: 20,
    color: "#99B8BE",
  },
  errorContainer: {
    flex: 2,
    // justifyContent: "center",
    marginBottom: 300,
    alignItems: "center",
  },
  createButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5,
    marginTop: 20,
    marginLeft: 50,
    backgroundColor: "#99B8BE99",
    width: 150,
    height: 40,
    borderRadius: 5,
  },
  createButtonText: {
    color: "#024552",
    fontSize: 14,
    fontFamily: "InterMedium",
    textAlign: "right",
  },
});
