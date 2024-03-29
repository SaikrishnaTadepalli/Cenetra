import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LogCard from "../components/LogCard";
import Picture from "../components/Picture";
import colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { getMediaByDate } from "../redux/mediaSlice";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { fetchLogs } from "../redux/dailyLogsSlice";

const LogScreen = ({ navigation, route }) => {
  const [logs, setLogs] = useState(JSON.parse(route.params.data));
  const { pictures, fetchImagesLoading, fetchImagesError } = useSelector(
    (state) => state.media
  );
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const findLogById = (logs, id) => {
    let foundLog = null;

    logs.forEach((segment) => {
      const log = segment.data.find((item) => item._id === id);
      if (log) {
        foundLog = log;
      }
    });

    return foundLog;
  };
  const retrieveData = async () => {
    const studentID = await AsyncStorage.getItem("studentID");
    dispatch(getMediaByDate({ studentID: studentID, date: route.params.date }))
      .then((response) => {})
      .catch((error) => console.error("Error in logs screen", error));
    dispatch(fetchLogs(studentID))
      .then((response) => {
        if (!response.error) {
          const log = findLogById(
            response.payload.data.logs,
            route.params.logID
          );
          setLogs(JSON.parse(log.details));
        }
      })
      .catch((error) => console.error("Error in Daily logs screen", error));
  };
  useFocusEffect(
    React.useCallback(() => {
      // console.log("use focus effect");
      retrieveData();
      return () => {
        // Clean up any resources if needed
      };
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    retrieveData();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <>
      {fetchImagesError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error while retrieving data</Text>
          <TouchableOpacity
            onPress={retrieveData}
            style={{ alignSelf: "center", marginTop: 20 }}
          >
            <Text style={styles.reloadButtonText}>Reload Data</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {fetchImagesLoading && !refreshing ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.indicator}
        />
      ) : (
        !fetchImagesError && (
          <ScrollView
            style={styles.container}
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {pictures.length > 0 ? (
              <View style={{ alignSelf: "flex-end" }}>
                <TouchableOpacity
                  style={styles.buttonText}
                  onPress={() =>
                    navigation.navigate("Gallery", {
                      pictures: pictures,
                      title: "Today's gallery",
                    })
                  }
                >
                  <Text style={styles.buttonText}>See All</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyStateText}>
                  There are no pictures for today.
                </Text>
              </View>
            )}
            <ScrollView horizontal={true} style={styles.imagesContainer}>
              {pictures.map((picture, idx) =>
                idx < 10 ? (
                  <View
                    key={`log-picture-${idx}`}
                    style={styles.imageContainer}
                  >
                    <Picture uri={picture} navigation={navigation} />
                  </View>
                ) : null
              )}
            </ScrollView>
            <LogCard
              question="Mood on arrival"
              answer={route.params.rating}
              type="rating"
            />
            {logs.radioButtonQuestions.map((radioButtonQuestion, index) => (
              <View key={`radio-button-question-${index}`}>
                {radioButtonQuestion.answer && (
                  <LogCard
                    question={radioButtonQuestion.question}
                    answer={radioButtonQuestion.answer}
                    type="radiobutton"
                  />
                )}
              </View>
            ))}
            {/* {logs.checkBoxQuestions.map((checkBoxQuestion, index) => (
              <View key={`multi-select-question-${index}`}>
                {checkBoxQuestion.answer.length > 0 && (
                  <LogCard
                    question={checkBoxQuestion.question}
                    answer={checkBoxQuestion.answer}
                    type="checkbox"
                  />
                )}
              </View>
            ))} */}
            {logs.openEndedQuestions.map((openEndedQuestion, index) => (
              <View key={`open-ended-question-${index}`}>
                {openEndedQuestion.answer && (
                  <LogCard
                    question={openEndedQuestion.question}
                    answer={openEndedQuestion.answer}
                    type="openended"
                  />
                )}
              </View>
            ))}
          </ScrollView>
        )
      )}
    </>
  );
};

export default LogScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "InterSemiBold",
    marginBottom: 8,
    marginTop: 10,
  },
  divider: {
    borderWidth: 0.5,
    width: "100%",
    marginBottom: 25,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 12,
    fontFamily: "InterMedium",
    marginVertical: 8,
  },
  imagesContainer: {
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  logsContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  indicator: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 999,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  errorText: {
    color: colors.red,
    fontFamily: "InterMedium",
    fontSize: 20,
  },
  reloadButtonText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "InterMedium",
  },
  emptyContainer: {
    borderWidth: 0.5,
    borderColor: "#5E5E5E",
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 20,
    padding: 10,
  },
  emptyStateText: {
    color: "#99B8BE",
    textAlign: "center",
    fontSize: 16,
  },
});
