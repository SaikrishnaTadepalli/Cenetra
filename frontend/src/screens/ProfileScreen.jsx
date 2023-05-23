import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../constants/Colors";
import ProfileCard from "../components/ProfileCard";
import * as studentData from "../../data/student.json";
import { fetchProfile } from "../redux/studentProfileSlice";
import { useDispatch } from "react-redux";

const ProfileScreen = ({ navigation }) => {
  const [isEditable, setEditable] = useState(false);
  const dispatch = useDispatch();

  const onPressEdit = () => {
    () => setEditable(true), navigation.navigate("EditProfile");
  };
  useEffect(() => {
    //console.log("useeffect");
    const retrieveData = async () => {
      const studentID = await AsyncStorage.getItem("studentID");
      //console.log(studentID);
      dispatch(fetchProfile(studentID))
        .then((response) => {
          //console.log(response);
        })
        .catch((error) => console.log("Error in Profile Screen screen", error));
    };
    retrieveData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={styles.profileContainer}>
        {!isEditable ? (
          <TouchableOpacity onPress={onPressEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.imageAndChildInfoContainer}>
          <Image
            source={{ uri: studentData.uri }}
            width={60}
            height={60}
            style={styles.image}
          />
          <View style={styles.studentDetailsContainer}>
            <Text style={styles.studentName}>{studentData.name}</Text>
            <Text style={styles.studentId}>
              Student ID: {studentData.student_number}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.profileContainer}>
        {studentData.information.map((item, idx) => (
          <ProfileCard
            sectionHeader={item.sectionHeader}
            data={item.section}
            key={idx}
            isEditable={isEditable}
            title={item.title}
          />
        ))}
      </View>
      <Text style={styles.footerText}>
        Last Updated {studentData.lastUpdated}
      </Text>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 15,
    fontFamily: "InterBold",
    textAlign: "right",
    marginBottom: 8,
  },
  profileContainer: {
    paddingVertical: 16,
    width: "100%",
  },
  imageAndChildInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  studentDetailsContainer: {
    marginLeft: 10,
  },
  studentName: {
    fontFamily: "InterBold",
    fontSize: 16,
    color: colors.navyBlue,
  },
  studentId: {
    fontFamily: "InterMedium",
    fontSize: 14,
    color: colors.navyBlue,
  },
  section: {
    fontFamily: "InterMedium",
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
    fontFamily: "InterBold",
  },
  cancelText: {
    color: colors.red,
    fontSize: 18,
    fontFamily: "InterBold",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
