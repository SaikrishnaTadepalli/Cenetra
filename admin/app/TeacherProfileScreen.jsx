import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SectionList,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import colors from "../src/constants/Colors";
import ProfileCard from "../src/components/ProfileCard";
import {
  fetchProfile,
  setIsNewProfileAdded,
} from "../src/redux/studentProfileSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const TeacherProfileScreen = ({ teacherID, teacherInfo, setTeacherID }) => {
  const dispatch = useDispatch();
  const layout = useWindowDimensions();

  const onPressBack = () => {
    setTeacherID("");
  };

  const renderText = (infoType, info) => {
    return (
      <View style={styles.infoLineContainer}>
        {infoType !== "" ? (
          <Text style={styles.infoTypeText}>{infoType}</Text>
        ) : null}
        <Text style={styles.infoInputText}>{info} </Text>
      </View>
    );
  };

  //console.log(studentInfo.information[4].section);
  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {layout.width < 768 && (
          <TouchableOpacity onPress={onPressBack}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.headerText}>{teacherInfo.name}</Text>
      </View>
      <Text style={styles.sectionHeaderText}>Profile information</Text>
      <View style={[styles.cardContainer, { width: "100%" }]}>
        {renderText("Teacher Number:", teacherInfo.teacherNumber)}
        {renderText("Email:", teacherInfo.email)}
        {renderText("Phone Number:", teacherInfo.phoneNumber)}
      </View>
    </>
  );
};

export default TeacherProfileScreen;

const styles = StyleSheet.create({
  container: {},
  profileContainer: {
    paddingVertical: 16,
  },
  cardContainer: {
    backgroundColor: "#D9D9D94D",
    // width: layout.width >= 768 ? 400 : "10%",
    justifyContent: "center",
    paddingVertical: 20,
    // height: 250,
    marginBottom: 40,
    borderRadius: 5,
    paddingLeft: 20,
    marginRight: 40,
  },
  imageAndChildInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  studentDetailsContainer: {
    marginLeft: 10,
    height: 90,
    justifyContent: "space-around",
  },
  studentName: {
    fontSize: 20,
    fontFamily: "InterBold",
  },
  studentId: {
    fontSize: 16,
    fontFamily: "InterSemiBold",
  },
  section: {
    fontSize: 14,
    color: colors.navyBlue,
  },
  footerText: {
    fontFamily: "InterMedium",
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 20,
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
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  indicator: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 999,
  },
  errorContainer: {
    //flex: 1,
    //justifyContent: "center",
    marginBottom: 300,
    // alignItems: "center",
  },
  errorText: {
    color: colors.red,
    fontSize: 20,
  },
  reloadButtonText: {
    color: colors.black,
    fontSize: 16,
  },
  whiteCardContainer: {
    width: 400,
    paddingBottom: 10,
    // height: "100%",
    borderColor: "#D9D9D980",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
    marginRight: 40,
    flexWrap: "no-wrap",
    // height: 300,
  },
  infoContainer: {
    marginLeft: 10,
  },
  sectionHeaderText: {
    color: colors.navyBlue,
    fontFamily: "InterSemiBold",
    fontSize: 16,
    marginBottom: 10,
  },
  headerText: {
    color: "black",
    fontFamily: "InterSemiBold",
    fontSize: 20,
    marginVertical: 12,
  },
  infoLineContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
  },
  infoTypeText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    marginRight: 10,
  },
  infoInputText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    flexWrap: "wrap",
  },
  healthInfoContainer: {
    flexDirection: "row",
  },
  divider: {
    borderColor: "#23342C",
    width: "95%",
    marginRight: 10,
    marginBottom: 14,
    alignSelf: "center",
    borderWidth: 0.7,
  },
  emptyText: {
    fontFamily: "InterSemiBold",
    fontSize: 20,
    color: "#99B8BE",
    alignSelf: "center",
    textAlignVertical: "center",
  },
  editButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5,
    backgroundColor: "#99B8BE99",
    width: 120,
    height: 40,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#024552",
    fontSize: 14,
    fontFamily: "InterMedium",
    textAlign: "right",
  },
  buttonContainer: {
    marginVertical: 20,
    backgroundColor: "#99B8BE99",
    height: 40,
    width: 132,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    alignSelf: "center",
    color: "#024552",
    fontWeight: 600,
  },
});
