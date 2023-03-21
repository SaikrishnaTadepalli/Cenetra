import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

import colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import ProfileCard from "../components/ProfileCard";

const ProfileScreen = () => {
  const icons = ["call", "md-location-sharp", "md-mail"];
  const data = [
    {
      title: "CONTACT INFORMATION",
      data: [
        {
          id: "1",
          title: "PARENT 1 CONTACT",
          subText1: "(000) 000 0000",
          subText2: "email@gmail.com",
        },
        {
          id: "2",
          title: "PARENT 2 CONTACT",
          subText1: "(000) 000 0000",
          subText2: "email@gmail.com",
        },
        {
          id: "3",
          title: "ADDRESS",
          subText1: "Address line 1",
          subText2: "Address line 2",
        },
      ],
    },
    {
      title: "HEALTH INFORMATION",
      data: [
        {
          id: "4",
          title: "Blood Group",
          subText1: "B+",
        },
        {
          id: "5",
          title: "Allergies",
          subText1: "Peanuts, Carrots",
        },
        {
          id: "6",
          title: "Medication",
          subText1: "1. Cough Syrup 10ml",
          subText2: "2. Some group",
        },
      ],
    },
    {
      title: "EMERGENCY CONTACTS",
      data: [
        {
          id: "7",
          title: "CONTACT 1",
          subText1: "(000) 000 0000",
          subText2: "email@gmail.com",
        },
        {
          id: "8",
          title: "CONTACT 2",
          subText1: "(000) 000 0000",
          subText2: "email@gmail.com",
        },
      ],
    },
  ];
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
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
      </View>
      <View style={styles.profileContainer}>
        {data.map((item) => (
          <ProfileCard
            sectionHeader={item.title}
            data={item.data}
            key={item.id}
          />
        ))}
      </View>
      <Text style={styles.footerText}>Last Updated 21 April 2022</Text>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
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
  footerText: {
    alignSelf: "center",
    color: colors.darkGrey,
  },
});
