import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "expo-router";

import * as classList from "../data/names.json";
import colors from "../src/constants/Colors";
import DailyLogsScreen from "./DailyLogs";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../src/redux/logsSlice";

const ClassListScreen = () => {
  const { students, isLoggedIn } = useSelector((state) => state.auth);
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState(
    students.length > 0 ? students[0].firstName + students[0].lastName : ""
  );
  const [studentID, setStudentID] = useState(students[0]._id);
  const handleClick = (name, studentID) => {
    //router.push(`/${name}`);
    //router.push("/LoginScreen");
    setName(name);
    setStudentID(studentID);
    dispatch(fetchLogs(studentID))
      .then(() => {})
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/LoginScreen");
    }
  }, [isLoggedIn]);

  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled={true}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={styles.header}>My Class</Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <ScrollView contentContainerStyle={styles.listView}>
          {students.map((student, idx) => (
            <TouchableOpacity
              style={styles.buttonContainer}
              key={`name-${idx}`}
              onPress={() =>
                handleClick(
                  student.firstName + " " + student.lastName,
                  student._id
                )
              }
            >
              <Text>{student.firstName + " " + student.lastName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View
          style={{
            flex: 2,
            marginLeft: "-20%",
            alignContent: "center",
          }}
        >
          <DailyLogsScreen name={name} studentID={studentID} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ClassListScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    fontSize: 20,
    marginLeft: 30,
    marginTop: 60,
    fontWeight: 600,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  listView: {
    width: "30%",
    marginLeft: 30,
    //flex: 1,
  },
  buttonContainer: {
    width: "100%",
    minHeight: 40,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
});
