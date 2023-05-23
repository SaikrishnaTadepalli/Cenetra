import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

import colors from "../constants/Colors";
import ProfileCard from "../components/ProfileCard";
import * as studentData from "../../data/student.json";

const ProfileScreen = () => {
  const [isEditable, setEditable] = useState(false);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={styles.profileContainer}>
        {!isEditable ? (
          <TouchableOpacity onPress={() => setEditable(true)}>
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
      {isEditable ? (
        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity>
            <Text style={styles.cancelText} onPress={() => setEditable(false)}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setEditable(false)}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
