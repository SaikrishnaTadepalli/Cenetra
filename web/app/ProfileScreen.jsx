import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";

import colors from "../src/constants/Colors";
import ProfileCard from "../src/components/ProfileCard";
import { fetchProfile } from "../src/redux/studentProfileSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = ({ curStudentID }) => {
  const { studentInfo, lastUpdated, studentID } = useSelector(
    (state) => state.studentProfile
  );
  const dispatch = useDispatch();
  const { fetchProfileLoading, fetchProfileError } = useSelector(
    (state) => state.studentProfile
  );

  const retrieveData = async () => {
    dispatch(fetchProfile(curStudentID))
      .then((response) => {})
      .catch((error) => console.log("Error in Profile Screen screen", error));
  };
  return (
    <>
      {(curStudentID !== studentID || curStudentID === "") &&
      !fetchProfileLoading ? (
        <View style={styles.errorContainer}>
          <Text>No profile exists for this student</Text>
        </View>
      ) : fetchProfileError ? (
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
      {fetchProfileLoading ? (
        <Text style={styles.indicator}>Loading student profile....</Text>
      ) : (
        !fetchProfileError &&
        curStudentID !== "" && (
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 50 }}
          >
            <View style={styles.profileContainer}>
              <View style={styles.imageAndChildInfoContainer}>
                <Image
                  source={{ uri: studentInfo.uri }}
                  width={60}
                  height={60}
                  style={styles.image}
                />
                <View style={styles.studentDetailsContainer}>
                  <Text style={styles.studentName}>{studentInfo.name}</Text>
                  <Text style={styles.studentId}>
                    Student ID: {studentInfo.student_number}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.profileContainer}>
              {studentInfo.information
                ? studentInfo.information.map((item, idx) => (
                    <ProfileCard
                      sectionHeader={item.sectionHeader}
                      data={item.section}
                      key={idx}
                      title={item.title}
                    />
                  ))
                : null}
            </View>
            <Text style={styles.footerText}>Last Updated {lastUpdated}</Text>
          </ScrollView>
        )
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 15,
    textAlign: "right",
    marginBottom: 8,
  },
  profileContainer: {
    paddingVertical: 16,
  },
  imageAndChildInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  studentDetailsContainer: {
    marginLeft: 10,
  },
  studentName: {
    fontSize: 16,
    color: colors.navyBlue,
  },
  studentId: {
    fontSize: 14,
    color: colors.navyBlue,
  },
  section: {
    fontSize: 14,
    color: colors.navyBlue,
  },
  footerText: {
    alignSelf: "center",
    color: colors.darkGrey,
  },
  saveButton: {
    marginLeft: 18,
  },
  saveText: {
    color: colors.buttonText,
    fontSize: 18,
    textAlign: "center",
  },
  cancelText: {
    color: colors.red,
    fontSize: 18,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
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
    fontSize: 20,
  },
  reloadButtonText: {
    color: colors.black,
    fontSize: 16,
  },
});
