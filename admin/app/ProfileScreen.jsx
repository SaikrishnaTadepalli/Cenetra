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
import CreateProfileScreen from "./CreateProfileScreen";

const ProfileScreen = ({
  curStudentID,
  imageUrl,
  doesProfileExist,
  studentName,
  studentNumber,
}) => {
  const {
    studentInfo,
    lastUpdated,
    studentID,
    fetchProfileLoading,
    fetchProfileError,
    isNewProfileAdded,
  } = useSelector((state) => state.studentProfile);
  const dispatch = useDispatch();
  const [bloodGroup, setBloodGroup] = useState("");
  const [medications, setMedications] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isProfileEdited, setIsProfileEdited] = useState(false);
  const [studentData, setStudentData] = useState(studentInfo);

  const retrieveData = async () => {
    dispatch(fetchProfile(curStudentID))
      .then((response) => {
        // console.log("fetching data");
        // console.log(response);
        if (response.error) {
          setError(response.error);
        } else {
          setError("");
          setStudentData(response.payload.studentInfo);
          console.log(response.payload.studentInfo);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Something went wrong please try again");
        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };

  const onPressCreate = () => {
    dispatch(setIsNewProfileAdded(true));
    setIsProfileEdited(false);
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

  useEffect(() => {
    const d = [];
    retrieveData();
    // if (studentInfo.information) {
    //   studentInfo.information.map((info, idx) => {
    //     d.push({
    //       sectionHeader: info.sectionHeader,
    //       data: info.section,
    //     });
    //   });
    //   setData(d);
    //   setAllergies(studentInfo.information[2].section);
    //   setMedications(studentInfo.information[3].section);
    //   setBloodGroup(studentInfo.information[4].section);
    // }
  }, [isNewProfileAdded]);
  const onPressEdit = () => {
    dispatch(setIsNewProfileAdded(true));
    setIsProfileEdited(true);
  };
  //console.log(studentInfo.information[0].section);
  return (
    <>
      {curStudentID === "" && !fetchProfileLoading && (
        <View style={styles.errorContainer}>
          <Text style={styles.emptyText}>
            Click on a student to view profile
          </Text>
        </View>
      )}
      {!doesProfileExist && !isNewProfileAdded ? (
        <View style={styles.errorContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPressCreate}
          >
            <Ionicons name="add" size={20} color="#024552" />
            <Text style={styles.buttonText}>Add Profile</Text>
          </TouchableOpacity>
          <Text style={styles.emptyText}>
            No profile exists for this student
          </Text>
        </View>
      ) : null}
      {!fetchProfileLoading && fetchProfileError && doesProfileExist ? (
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
        <Text style={styles.errorContainer}>Loading student profile....</Text>
      ) : (
        (!fetchProfileError || !doesProfileExist) && (
          <>
            {curStudentID !== "" && !isNewProfileAdded && doesProfileExist && (
              <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 50 }}
              >
                <View style={styles.profileContainer}>
                  <View style={styles.imageAndChildInfoContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={{ uri: imageUrl }}
                        width={100}
                        height={100}
                        style={styles.image}
                      />
                      <View style={styles.studentDetailsContainer}>
                        <Text style={styles.studentName}>
                          {studentData.name}
                        </Text>
                        <Text style={styles.studentId}>
                          Student ID: {studentData.student_number}
                        </Text>
                        {studentData.information
                          ? studentData.information[4].section.map(
                              (item, idx) => (
                                <Text style={styles.studentId}>
                                  Blood group: {item.name}
                                </Text>
                              )
                            )
                          : null}
                      </View>
                    </View>
                    {/* <TouchableOpacity
                      onPress={onPressEdit}
                      style={styles.editButtonContainer}
                    >
                      <MaterialCommunityIcons
                        name="pencil-outline"
                        size={20}
                        color="#024552"
                      />
                      <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
                <View style={styles.profileContainer}>
                  <Text style={styles.footerText}>
                    Last Updated {lastUpdated}
                  </Text>
                  {studentData.information
                    ? studentData.information.map(
                        (item, idx) =>
                          (item.sectionHeader === "PRIMARY CONTACTS" ||
                            item.sectionHeader === "EMERGENCY CONTACTS") && (
                            <ProfileCard
                              sectionHeader={item.sectionHeader}
                              data={item.section}
                              key={`${item.sectionHeader}-${idx}`}
                              title={item.title}
                              isApproval={false}
                            />
                          )
                      )
                    : null}
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.whiteCardContainer}>
                      <Text style={styles.headerText}>
                        Allergen information
                      </Text>
                      {studentData.information &&
                        studentData.information[2].section.map((data, idx) => (
                          <View key={`profile-info-allergies${idx}`}>
                            {renderText("Item:", data.name)}
                            {renderText("Severity:", data.severity)}
                            {studentData.information[2].section.indexOf(
                              data
                            ) !==
                            studentData.information[2].section.length - 1 ? (
                              <View style={styles.divider} />
                            ) : null}
                          </View>
                        ))}
                    </View>
                    <View style={[styles.whiteCardContainer]}>
                      <Text style={styles.headerText}>Medications</Text>
                      {studentData.information &&
                        studentData.information[3].section.map((data, idx) => (
                          <View key={`profile-info-medications${idx}`}>
                            {renderText("Medicine Name:", data.name)}
                            {renderText("Dosage:", data.dosage)}
                            {renderText("Frequency:", data.frequency)}
                            {studentData.information[3].section.indexOf(
                              data
                            ) !==
                            studentData.information[3].section.length - 1 ? (
                              <View style={styles.divider} />
                            ) : null}
                          </View>
                        ))}
                    </View>
                  </View>
                </View>
              </ScrollView>
            )}
            {isNewProfileAdded && (
              <View style={{ width: "80%" }}>
                <CreateProfileScreen
                  studentID={curStudentID || studentID}
                  studentName={
                    doesProfileExist ? studentData.name : studentName
                  }
                  studentNumber={
                    doesProfileExist
                      ? studentData.student_number
                      : studentNumber
                  }
                  isEdit={isProfileEdited}
                  imageUrl={imageUrl}
                />
              </View>
            )}
          </>
        )
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {},
  profileContainer: {
    paddingVertical: 16,
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
