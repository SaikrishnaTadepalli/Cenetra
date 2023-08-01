import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "expo-router";
import moment from "moment-timezone";

import colors from "../src/constants/Colors";
import DropDown from "../src/components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../src/redux/logsSlice";
import CreateLogScreen from "./CreateLogScreen";
import LogScreen from "./LogScreen";
import LogsScreen from "./LogsScreen";

const DailyLogsScreen = () => {
  const c = localStorage.getItem("classes");
  const c2 = JSON.parse(c);
  const classes = JSON.parse(c2).classes;
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [date, setDate] = useState("");
  const [isOldLogSelected, setIsOldLogSelected] = useState(false);
  const [isStudentNameSelected, setIsStudentNameSelected] = useState(false);
  const [logID, setLogID] = useState("");
  const curDate = moment().utc().format("MMMM D, YYYY");

  const classInfo = classes.map((item) => ({
    key: item._id,
    value: item.className,
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
      setStudentID("");
    } else {
      // Select all options
      setSelectedClasses(classInfo);
    }
  };

  const onPressDelete = (idx) => {
    const updatedItems = [...selectedClasses];
    updatedItems.splice(idx, 1);
    setSelectedClasses(updatedItems);
  };

  const onClickLog = (logID) => {
    setIsOldLogSelected(true);
    setLogID(logID);
  };
  const handleClick = (name, studentID) => {
    //router.push(`/${name}`);
    //router.push("/LoginScreen");
    setName(name);
    setStudentID(studentID);
    setIsStudentNameSelected(true);
    dispatch(fetchLogs(studentID))
      .then(() => {})
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/LoginScreen");
    }
  }, [isLoggedIn]);
  // console.log(isOldLogSelected);
  return (
    <View
      style={styles.container}
      nestedScrollEnabled={true}
      // contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Class List</Text>
        <DropDown
          options={classInfo}
          selectedOptions={selectedClasses}
          setSelectedOptions={handleCheckboxSelectionForClasses}
          onSelectAll={handleSelectAllForClasses}
          onPressDelete={onPressDelete}
          dropdownText="Select class to view"
        />
      </View>
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
                    onPress={() =>
                      handleClick(
                        student.firstName + " " + student.lastName,
                        student._id
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.nameText,
                        {
                          color:
                            student._id === studentID ? "#4F0059" : "#5E5E5E",
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
            // backgroundColor: "pink",
          }}
        >
          <View style={styles.verticalDivider} />
          {isStudentNameSelected ? (
            <LogsScreen
              name={name}
              studentID={studentID}
              setIsStudentNameSelected={setIsStudentNameSelected}
              setIsOldLogSelected={setIsOldLogSelected}
              setDate={setDate}
              setLogID={setLogID}
            />
          ) : name === "" ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateMessage}>
                Select a name to view a log.
              </Text>
            </View>
          ) : (
            <View style={{ height: "100%", width: "100%" }}>
              {isOldLogSelected ? (
                <LogScreen
                  logID={logID}
                  setIsOldLogSelected={setIsOldLogSelected}
                  setIsStudentNameSelected={setIsStudentNameSelected}
                  setDate={setDate}
                  curDate={curDate}
                  name={name}
                  setLogID={setLogID}
                  studentID={studentID}
                />
              ) : (
                <CreateLogScreen
                  date={curDate}
                  studentID={studentID}
                  name={name}
                  logID={logID}
                  setIsStudentNameSelected={setIsStudentNameSelected}
                  setIsOldLogSelected={setIsOldLogSelected}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default DailyLogsScreen;

const styles = StyleSheet.create({
  container: {
    // width: "50%",
    // height: "100%",
    // backgroundColor: "pink",
  },
  headerContainer: {
    marginLeft: 30,
    marginBottom: 20,
    marginTop: 40,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "InterBold",
    marginBottom: 34,
  },
  subHeaderText: {
    fontSize: 24,
    fontFamily: "InterSemiBold",
  },
  nameText: {
    fontFamily: "InterMedium",
    fontSize: 14,
  },
  className: {
    fontSize: 16,
    fontFamily: "InterSemiBold",
    marginVertical: 20,
  },
  listView: {
    width: "30%",
    marginLeft: 30,
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
  verticalDivider: {
    borderLeftColor: "#D9D9D980",
    borderLeftWidth: 1,
    marginRight: 50,
    marginLeft: "-45%",
  },
  emptyStateMessage: {
    color: "#99B8BE",
    fontFamily: "InterMedium",
    fontSize: 16,
  },
  emptyStateContainer: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
  },
});
