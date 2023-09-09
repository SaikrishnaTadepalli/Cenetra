import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "expo-router";
import moment from "moment-timezone";

import CreateResponsiveStyle from "../src/components/CreateResponsiveStyle";
import colors from "../src/constants/Colors";
import DailyLogsScreen from "./DailyLogs";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../src/redux/logsSlice";
import CreateLogScreen from "./CreateLogScreen";
import LogScreen from "./LogScreen";

const ClassListScreen = () => {
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
  const s = localStorage.getItem("students");
  const s2 = JSON.parse(s);
  const students = JSON.parse(s2).students;
  const state = useSelector((state) => state.auth);
  const { isNewLogAdded } = useSelector((state) => state.log);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [isStudentListSelected, setIsStudentListSelected] = useState(true);
  const [date, setDate] = useState("");
  const [isOldLogSelected, setIsOldLogSelected] = useState(false);
  const [isStudentNameSelected, setIsStudentNameSelected] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [logID, setLogID] = useState("");
  const curDate = moment().utc().format("MMMM D, YYYY");

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

  return (
    <View
      style={styles("container")}
      nestedScrollEnabled={true}
      // contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles("headerContainer")}>
        <Text style={styles("headerText")}>Class List</Text>
        <Text style={styles("subHeaderText")}>My Class</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {isStudentListSelected && (
          <ScrollView
            contentContainerStyle={styles("listView")}
            showsVerticalScrollIndicator={false}
          >
            {students.map((student, idx) => (
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
                    student.firstName + " " + student.lastName,
                    student._id
                  )
                }
              >
                <Text
                  style={[
                    styles("nameText"),
                    {
                      color: student._id === studentID ? "#4F0059" : "#5E5E5E",
                    },
                  ]}
                >
                  {student.firstName + " " + student.lastName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {layout.width >= 768 ? (
          <View style={styles("rightContent")}>
            <View style={styles("verticalDivider")} />
            {isStudentNameSelected ? (
              <DailyLogsScreen
                name={name}
                studentID={studentID}
                setIsStudentNameSelected={setIsStudentNameSelected}
                setIsOldLogSelected={setIsOldLogSelected}
                setDate={setDate}
                setLogID={setLogID}
              />
            ) : name === "" ? (
              <View style={styles("emptyStateContainer")}>
                <Text style={styles("emptyStateMessage")}>
                  Select a name to view a log.
                </Text>
              </View>
            ) : (
              <View style={{ width: "100%" }}>
                {isOldLogSelected ? (
                  <LogScreen
                    logID={logID}
                    setIsOldLogSelected={setIsOldLogSelected}
                    setDate={setDate}
                    curDate={curDate}
                    name={name}
                    setLogID={setLogID}
                    setIsStudentNameSelected={setIsStudentNameSelected}
                    studentID={studentID}
                  />
                ) : (
                  <CreateLogScreen
                    date={curDate}
                    studentID={studentID}
                    name={name}
                    setIsStudentNameSelected={setIsStudentNameSelected}
                    setIsOldLogSelected={setIsOldLogSelected}
                    logID={logID}
                    setLogID={setLogID}
                  />
                )}
              </View>
            )}
          </View>
        ) : (
          <>
            {isStudentNameSelected ? (
              <View style={{ width: isStudentNameSelected ? "100%" : "0%" }}>
                <DailyLogsScreen
                  name={name}
                  studentID={studentID}
                  setIsStudentNameSelected={setIsStudentNameSelected}
                  setIsOldLogSelected={setIsOldLogSelected}
                  setDate={setDate}
                  setLogID={setLogID}
                  setIsStudentListSelected={setIsStudentListSelected}
                />
              </View>
            ) : (
              name !== "" && (
                <>
                  {isOldLogSelected ? (
                    <View style={{ width: isOldLogSelected ? "100%" : "0%" }}>
                      <LogScreen
                        logID={logID}
                        setIsOldLogSelected={setIsOldLogSelected}
                        setDate={setDate}
                        curDate={curDate}
                        name={name}
                        setLogID={setLogID}
                        setIsStudentNameSelected={setIsStudentNameSelected}
                        studentID={studentID}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        width: isNewLogAdded || isSaved ? "100%" : "0%",
                      }}
                    >
                      <CreateLogScreen
                        date={curDate}
                        studentID={studentID}
                        name={name}
                        setIsStudentNameSelected={setIsStudentNameSelected}
                        setIsOldLogSelected={setIsOldLogSelected}
                        logID={logID}
                        setIsSaved={setIsSaved}
                        isSaved={isSaved}
                        setLogID={setLogID}
                      />
                    </View>
                  )}
                </>
              )
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default ClassListScreen;

const responsiveStyle = CreateResponsiveStyle(
  {
    container: {
      // width: "50%",
      // height: "100%",
      // backgroundColor: "pink",
    },
    headerContainer: {
      marginLeft: 30,
      marginBottom: 20,
      marginTop: 60,
    },
    headerText: {
      fontSize: 40,
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
    rightContent: {
      flexDirection: "row",
      height: "100%",
      width: "50%",
      marginTop: -45,
      //backgroundColor: "pink",
    },
  },
  {
    container: {
      width: "100%",
    },
    listView: {
      //width: "100%",
    },
  }
);

const styles = StyleSheet.create({
  container: {
    // width: "50%",
    // height: "100%",
    // backgroundColor: "pink",
  },
  headerContainer: {
    marginLeft: 30,
    marginBottom: 20,
    marginTop: 60,
  },
  headerText: {
    fontSize: 40,
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
