import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const icons = ["call", "md-location-sharp", "md-mail"];
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageAndChildInfoContainer}>
          <Image
            source={require("../../assets/images/childImage.png")}
            width={60}
            height={60}
          />
          <View style={styles.studentDetailsContainer}>
            <Text style={styles.studentName}>Cashew Patel</Text>
            <Text style={styles.studentId}>Student Number: 90982047</Text>
          </View>
        </View>
        <Text style={styles.teacherName}>Teacher: Ms Johanna Beckett</Text>
        <Text style={styles.section}>Section: 2 B</Text>
      </View>
      <View style={styles.iconsContainer}>
        {icons.map((icon, idx) => (
          <TouchableOpacity style={styles.iconContainer} key={idx}>
            <Ionicons name={icon} size={24} color={colors.purple} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  profileContainer: {
    backgroundColor: colors.lightPurple,
    borderRadius: 10,
    paddingHorizontal: 20,
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
  teacherName: {
    fontFamily: "InterMedium",
    fontSize: 14,
    color: colors.navyBlue,
    marginVertical: 10,
  },
  section: {
    fontFamily: "InterMedium",
    fontSize: 14,
    color: colors.navyBlue,
  },
  iconsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: colors.lightPurple,
    borderRadius: 8,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
