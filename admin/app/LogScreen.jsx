import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import colors from "../src/constants/Colors";
import { fetchLogs, setIsNewLogAdded } from "../src/redux/logsSlice";
import MultiSelectQuestion from "../src/components/MultiSelectQuestion";
import MultipleChoiceQuestion from "../src/components/MultipleChoiceQuestion";

const LogScreen = ({
  logID,
  setIsOldLogSelected,
  setIsStudentNameSelected,
  setDate,
  curDate,
  name,
  setLogID,
  studentID,
}) => {
  const { logs, editLogsSuccessful } = useSelector((state) => state.log);
  const findLogById = (id) => {
    let foundLog = null;

    logs.forEach((segment) => {
      const log = segment.data.find((item) => item._id === id);
      if (log) {
        foundLog = log;
      }
    });

    return foundLog;
  };
  const log = findLogById(logID);
  const parsedLog = log ? JSON.parse(log.details) : null;
  const rating = log ? parseInt(log.rating) : 0;
  const date = log ? moment(log.createdAt).utc().format("MMMM D, YYYY") : "";
  const dispatch = useDispatch();

  const renderIcon = (name, idx) => (
    <Ionicons
      key={`${name}-${idx}`}
      name={name}
      color="#FAC748"
      size={20}
      style={{ marginRight: 8 }}
    />
  );
  const renderIcons = (num, name) =>
    [...Array(num).keys()].map((idx) => renderIcon(name, idx));

  const onPressEdit = () => {
    setIsOldLogSelected(false);
    setDate(date);
    dispatch(setIsNewLogAdded(true));
    setLogID(logID);
  };
  // console.log("Log scren", parsedLog);

  const onPressBack = () => {
    setIsStudentNameSelected(true);
    setIsOldLogSelected(false);
  };

  const retrieveData = () => {
    dispatch(fetchLogs(studentID))
      .then(() => {})
      .catch((error) => console.error(error));
  };
  //console.log("Log scren", logID);
  useEffect(() => {
    retrieveData();
  }, [editLogsSuccessful]);

  return (
    <View style={styles.container}>
      <View style={styles.logHeaderContainer}>
        <TouchableOpacity onPress={onPressBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.headerText}>{name}'s Logs</Text>
          {date === curDate && (
            <Text style={styles.subHeaderText}>Today's Logs</Text>
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={onPressEdit}
            style={styles.editButtonContainer}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={20}
              color="#024552"
            />
            <Text style={styles.editButtonText}>Edit Log</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.dateContainer}>
          <Text
            style={[
              styles.dateText,
              { fontFamily: "InterSemiBold", marginRight: 20 },
            ]}
          >
            Date
          </Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </View>
      <View style={styles.ratingContainer}>
        {rating > 0 ? (
          <>
            <Text style={styles.ratingText}>Rating</Text>
            {renderIcons(rating, "star")}
            {renderIcons(5 - rating, "star-outline")}{" "}
          </>
        ) : null}
      </View>
      {parsedLog &&
        parsedLog.radioButtonQuestions.map((radioButtonQuestion, index) => (
          <View key={`radio-button-question-${index}`}>
            <>
              {radioButtonQuestion.answer && (
                <View
                  style={{
                    marginBottom: 20,
                    width: "100%",
                    // backgroundColor: "red",
                  }}
                >
                  <MultipleChoiceQuestion
                    question={radioButtonQuestion.question}
                    answers={radioButtonQuestion.options}
                    selectedValue={radioButtonQuestion.answer}
                    disabled={true}
                  />
                </View>
              )}
            </>
          </View>
        ))}
      {parsedLog &&
        parsedLog.checkBoxQuestions.map((checkBoxQuestion, index) => (
          <View key={`multi-select-question-${index}`}>
            {checkBoxQuestion.answer.length > 0 && (
              <MultiSelectQuestion
                disabled={true}
                question={checkBoxQuestion.question}
                answers={checkBoxQuestion.answer}
                checkedItems={checkBoxQuestion.options}
              />
            )}
          </View>
        ))}
      {parsedLog &&
        parsedLog.openEndedQuestions.map((openEndedQuestion, index) => (
          <View key={`open-ended-question-${index}`}>
            <>
              {openEndedQuestion.answer && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                    marginTop: 30,
                  }}
                >
                  <Text style={styles.question}>
                    {openEndedQuestion.question}
                  </Text>
                  <View style={styles.openEndedAnswerContainer}>
                    <Text style={styles.answer}>
                      {openEndedQuestion.answer}
                    </Text>
                  </View>
                </View>
              )}
            </>
          </View>
        ))}
    </View>
  );
};

export default LogScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor: "red",
    height: "100%",
  },
  logHeaderContainer: {
    flexDirection: "row",
    marginBottom: 40,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "InterMedium",
    marginRight: 15,
  },
  subHeaderText: {
    color: "#719792",
    fontSize: 16,
    fontFamily: "InterMedium",
  },
  dateText: {
    fontFamily: "InterBold",
    fontSize: 16,
  },
  ratingContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 10,
  },
  ratingText: {
    fontSize: 16,
    fontFamily: "InterSemiBold",
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardContainer: {
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingBottom: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    textAlign: "flex-start",
    fontSize: 20,
    fontFamily: "InterSemiBold",
    marginBottom: 20,
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "InterMedium",
    fontSize: 16,
    width: "30%",
    marginRight: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: "InterRegular",
    paddingBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    minWidth: 150,
  },
  editButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5,
    backgroundColor: "#99B8BE99",
    width: 100,
    height: 40,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#024552",
    fontSize: 14,
    fontFamily: "InterMedium",
    textAlign: "right",
  },
  question: {
    fontSize: 16,
    fontFamily: "InterMedium",
    marginRight: 20,
  },
  answer: {
    fontSize: 16,
    fontFamily: "InterMedium",
  },
  openEndedAnswerContainer: {
    backgroundColor: "#D9D9D933",
    borderRadius: 5,
    width: 300,
    // height: 100,
    borderColor: "#D9D9D933",
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
