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
import { Ionicons } from "@expo/vector-icons";

import CreateResponsiveStyle from "../src/components/CreateResponsiveStyle";
import colors from "../src/constants/Colors";
import ProfileCard from "../src/components/ProfileCard";
import { fetchProfile } from "../src/redux/studentProfileSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = ({ curStudentID, imageUrl, setStudentID }) => {
  const {
    studentInfo,
    lastUpdated,
    studentID,

    fetchProfileLoading,
    fetchProfileError,
  } = useSelector((state) => state.studentProfile);
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
  const dispatch = useDispatch();
  const [bloodGroup, setBloodGroup] = useState("");
  const [medications, setMedications] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const onPressBack = () => {
    setStudentID("");
  };

  const retrieveData = async () => {
    dispatch(fetchProfile(curStudentID))
      .then((response) => {
        //console.log(response);
        if (response.error) {
          setError(response.error);
        } else {
          setError("");
        }
      })
      .catch((error) => console.error("Error in Profile Screen screen", error));
  };

  const renderText = (infoType, info) => {
    return (
      <View style={styles("infoLineContainer")}>
        {infoType !== "" ? (
          <Text style={styles("infoTypeText")}>{infoType}</Text>
        ) : null}
        <Text style={styles("infoInputText")}>{info} </Text>
      </View>
    );
  };

  useEffect(() => {
    const d = [];
    if (studentInfo.information) {
      studentInfo.information.map((info, idx) => {
        d.push({
          sectionHeader: info.sectionHeader,
          data: info.section,
        });
      });
      setData(d);
      // console.log(data);
      setAllergies(studentInfo.information[2].section);
      setMedications(studentInfo.information[3].section);
      setBloodGroup(studentInfo.information[4].section[0]);
    }
  }, []);

  return (
    <>
      {curStudentID === "" &&
        !fetchProfileLoading &&
        useWindowDimensions.width >= 768 && (
          <View style={styles("errorContainer")}>
            <Text style={styles("emptyText")}>
              Click on a student to view profile
            </Text>
          </View>
        )}
      {curStudentID !== studentID &&
      curStudentID !== "" &&
      !fetchProfileLoading &&
      !fetchProfileError ? (
        <View style={styles("errorContainer")}>
          <Text style={styles("emptyText")}>
            No profile exists for this student
          </Text>
        </View>
      ) : null}
      {!fetchProfileLoading && fetchProfileError ? (
        <>
          {layout.width < 768 && (
            <TouchableOpacity onPress={onPressBack}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          )}
          <View style={styles("errorContainer")}>
            <Text style={styles("errorText")}>Error while retrieving data</Text>
            <TouchableOpacity
              onPress={retrieveData}
              style={{ alignSelf: "center", marginTop: 20 }}
            >
              <Text style={styles("reloadButtonText")}>Reload Data</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
      {fetchProfileLoading ? (
        <Text style={styles("errorContainer")}>
          Loading student profile....
        </Text>
      ) : (
        !fetchProfileError &&
        curStudentID !== "" && (
          <ScrollView
            style={styles("container")}
            contentContainerStyle={{ paddingBottom: 50 }}
            // showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {layout.width < 768 && (
                <TouchableOpacity onPress={onPressBack}>
                  <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
              )}
              <View style={styles("imageAndChildInfoContainer")}>
                <Image
                  source={{ uri: imageUrl }}
                  width={100}
                  height={100}
                  style={styles("image")}
                />
                <View style={styles("studentDetailsContainer")}>
                  <Text style={styles("studentName")}>{studentInfo.name}</Text>
                  <Text style={styles("studentId")}>
                    Student ID: {studentInfo.student_number}
                  </Text>
                  {studentInfo.information
                    ? studentInfo.information[4].section.map((item, idx) => (
                        <Text style={styles("studentId")}>
                          Blood group: {item.name}
                        </Text>
                      ))
                    : null}
                </View>
              </View>
            </View>
            <View style={styles("profileContainer")}>
              <Text style={styles("footerText")}>
                Last Updated {lastUpdated}
              </Text>
              <View style={{ flexDirection: "column", paddingRight: 30 }}>
                {studentInfo.information
                  ? studentInfo.information.map(
                      (item, idx) =>
                        (item.sectionHeader === "PRIMARY CONTACTS" ||
                          item.sectionHeader === "EMERGENCY CONTACTS") && (
                          <ProfileCard
                            sectionHeader={item.sectionHeader}
                            data={item.section}
                            key={idx}
                            title={item.title}
                          />
                        )
                    )
                  : null}
              </View>
              <View style={styles("allergenAndMedicationContainer")}>
                {studentInfo.information &&
                  studentInfo.information[2].section.length > 0 && (
                    <View style={styles("whiteCardContainer")}>
                      <Text style={styles("headerText")}>
                        Allergen information
                      </Text>
                      {studentInfo.information &&
                        studentInfo.information[2].section.map((data, idx) => (
                          <View key={`profile-info-allergies${idx}`}>
                            {renderText("Item:", data.name)}
                            {renderText("Severity:", data.severity)}
                            {studentInfo.information[2].section.indexOf(
                              data
                            ) !==
                            studentInfo.information[2].section.length - 1 ? (
                              <View style={styles("divider")} />
                            ) : null}
                          </View>
                        ))}
                    </View>
                  )}
                {studentInfo.information &&
                  studentInfo.information[3].section.length > 0 && (
                    <View style={[styles("whiteCardContainer")]}>
                      <Text style={styles("headerText")}>Medications</Text>
                      {studentInfo.information &&
                        studentInfo.information[3].section.map((data, idx) => (
                          <View key={`profile-info-medications${idx}`}>
                            {renderText("Medicine Name:", data.name)}
                            {renderText("Dosage:", data.dosage)}
                            {renderText("Frequency:", data.frequency)}
                            {studentInfo.information[3].section.indexOf(
                              data
                            ) !==
                            studentInfo.information[3].section.length - 1 ? (
                              <View style={styles("divider")} />
                            ) : null}
                          </View>
                        ))}
                    </View>
                  )}
              </View>
            </View>
          </ScrollView>
        )
      )}
    </>
  );
};

export default ProfileScreen;

const responsiveStyle = CreateResponsiveStyle(
  {
    container: {
      // paddingHorizontal: 30,
      //backgroundColor: "pink",
    },
    profileContainer: {
      paddingVertical: 16,
    },
    imageAndChildInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 20,
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
      flex: 1,
      justifyContent: "center",
      marginBottom: 300,
      alignItems: "center",
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
    },
    allergenAndMedicationContainer: {
      flexDirection: "row",
    },
  },
  {
    container: {
      width: "100%",
    },
    allergenAndMedicationContainer: {
      flexDirection: "column",
    },
    whiteCardContainer: {
      marginBottom: 20,
    },
  }
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  profileContainer: {
    paddingVertical: 16,
  },
  imageAndChildInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
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
    flex: 1,
    justifyContent: "center",
    marginBottom: 300,
    alignItems: "center",
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
  },
});
