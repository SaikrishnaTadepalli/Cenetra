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
import EditProfileCard from "../components/EditProfileCard";
import * as studentData from "../../data/student.json";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/studentProfileSlice";

const EditProfileScreen = ({ navigation }) => {
  const [isEditable, setEditable] = useState(true);
  const dispatch = useDispatch();

  const onCancel = () => {
    setEditable(false);
    navigation.goBack();
  };

  const onSave = () => {
    // if (subject && details) {
    //   dispatch(
    //     updateProfile({
    //       studentID: studentID,
    //       details: " ",
    //     })
    //   )
    //     .then(() => {
    //       setEditable(false);
    //       setIsInputEmpty(false);
    //       setIsSaved(true);
    //       setTimeout(() => {
    //         setIsSaved(false);
    //         setEditable(true);
    //         setSubject("");
    //         setDetails("");
    //         navigation.goBack();
    //       }, 2000);
    //     })
    //     .catch((error) => console.log(error));
    // } else {
    //   setIsInputEmpty(true);
    //  }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={styles.profileContainer}>
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
          <EditProfileCard
            sectionHeader={item.sectionHeader}
            data={item.section}
            key={idx}
            isEditable={isEditable}
            title={item.title}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginRight: 10,
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity>
          <Text style={styles.cancelText} onPress={onCancel}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

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
