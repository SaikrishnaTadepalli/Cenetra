import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SectionList,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

import colors from "../src/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import typeColorMapping from "../api/typeColorMapping";
import NewInfoScreen from "./NewInfoScreen";
import {
  fetchPendingProfile,
  fetchProfile,
} from "../src/redux/studentProfileSlice";

const ApprovalsScreen = () => {
  const dispatch = useDispatch();
  // const router = useRouter();
  const state = useSelector((state) => state);
  const c = localStorage.getItem("classes");
  const c2 = JSON.parse(c);
  const classes = JSON.parse(c2);
  const { fetchPendingProfileLoading, fetchProfileLoading } =
    state.studentProfile;
  const { isLoggedIn } = state.auth;
  const [error, setError] = useState("");
  const [oldStudentData, setOldStudentData] = useState({});
  const [updatedStudentData, setUpdatedStudentData] = useState({});
  const [differences, setDifferences] = useState([]);
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [profileID, setProfileID] = useState("");

  const onClickChange = (item) => {
    setProfileID(item.profileID);
  };

  const compareStudentData = (dataSet1, dataSet2) => {
    //console.log(dataSet1);
    const student1 = dataSet1;
    const student2 = dataSet2;
    // Compare the properties or values of the objects
    // Compare the name property
    if (student1.name !== student2.name) {
      console.log("Name difference:", student1.name, "vs", student2.name);
    }
    // Compare the student_number property
    if (student1.student_number !== student2.student_number) {
      console.log(
        "Student number difference:",
        student1.student_number,
        "vs",
        student2.student_number
      );
    }
    // console.log(student1.information && student1.information);
    // console.log(student1.information);
    if (student1.information && student2.information) {
      for (let i = 0; i < 5; i++) {
        const info1 = student1.information[i];
        const info2 = student2.information[i];
        // Compare the section array
        const oldData = [];
        const newData = [];
        for (let k = 0; k < info1.section.length; k++) {
          const section1 = info1.section[k];
          const section2 = info2.section[k];
          // console.log(section1);
          if (
            info1.sectionHeader === "PRIMARY CONTACTS" ||
            info1.sectionHeader === "EMERGENCY CONTACTS"
          ) {
            if (section1.name !== section2.name) {
              console.log(
                "Name difference for",
                student1.name,
                "at index",
                i,
                "within section",
                k
              );
            }
            if (section1.relationship !== section2.relationship) {
              console.log(
                "Relationship difference for",
                student1.name,
                "at index",
                i,
                "within section",
                k
              );
            }
            if (section1.email !== section2.email) {
              console.log(
                "Email difference for",
                student1.name,
                "at index",
                i,
                "within section",
                k
              );
            }
            if (section1.phoneNumber !== section2.phoneNumber) {
              console.log(
                "Phone number difference for",
                student1.name,
                "at index",
                i,
                "within section",
                k
              );
            }
            if (section1.address !== section2.address) {
              console.log(
                "Address difference for",
                student1.name,
                "at index",
                i,
                "within section",
                k
              );
            }
          }
          if (info1.sectionHeader === "ALLERGIES") {
            if (
              section1.name !== section2.name ||
              section1.severity !== section2.severity
            ) {
              //console.log("Difference");
              oldData.push({
                name: section1.name,
                severity: section1.severity,
              });
              newData.push({
                name: section2.name,
                severity: section2.severity,
              });
            }
            const updatedData = [...differences];
            updatedData.push({
              sectionHeader: "ALLERGIES",
              oldData,
              newData,
            });
            setDifferences(updatedData);
          }
          if (info1.sectionHeader === "MEDICATIONS") {
            if (
              section1.name !== section2.name ||
              section1.dosage !== section2.dosage ||
              section1.frequency !== section2.frequency
            ) {
              oldData.push({
                name: section1.name,
                dosage: section1.dosage,
                frequency: section1.frequency,
              });
              newData.push({
                name: section2.name,
                dosage: section2.dosage,
                frequency: section2.frequency,
              });
              const updatedData = [...differences];
              updatedData.push({
                sectionHeader: "MEDICATIONS",
                oldData,
                newData,
              });
              setDifferences(updatedData);
            }
          }
          if (info1.sectionHeader === "BLOOD GROUP") {
            if (section1.name !== section2.name) {
              console.log(
                "Blood group difference for",
                student1.name,
                "at index",
                i,
                "within section",
                k
              );
            }
          }
        }
      }
    }
  };

  const retrieveData = async () => {
    // console.log(classes.classes[0].students[0]);
    await dispatch(
      fetchPendingProfile(classes.classes[0].students[0]._id)
    ).then((response) => {
      if (response.error) {
        setError("Something went wrong, please try again.");
      } else {
        setUpdatedStudentData(response.payload.studentInfo);
        setProfileID(response.payload.profileID);
        setDate(response.payload.lastUpdated);
      }
    });
    await dispatch(fetchProfile(classes.classes[0].students[0]._id)).then(
      (response) => {
        if (response.error) {
          setError("Something went wrong, please try again.");
        } else {
          setOldStudentData(response.payload.studentInfo);
        }
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      await retrieveData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    getInfo();
  }, [updatedStudentData, oldStudentData]);

  const getInfo = () => {
    console.log(updatedStudentData, oldStudentData);
    if (oldStudentData !== {} && updatedStudentData !== {}) {
      compareStudentData(oldStudentData, updatedStudentData);
      // console.log(differences);
      const newData = {
        profileID: profileID,
        differences: differences,
        lastUpdated: date,
      };
      const updatedData = [...data];
      updatedData.push(newData);
      setData(updatedData);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      // router.push("/LoginScreen");
    }
  }, [isLoggedIn]);

  const printSectionHeader = (sectionHeader) => {
    if (sectionHeader === "ALLERGIES") {
      return "Allergen";
    } else if (sectionHeader === "MEDICATIONS") {
      return "Medication";
    }
    if (
      sectionHeader === "PRIMARY CONTACTS" ||
      sectionHeader === "EMERGENCY CONTACTS"
    ) {
      return "Contact";
    }
    if (sectionHeader === "BLOOD GROUP") {
      return "Blood Group";
    }
  };

  const renderItem = (item) => {
    console.log(item);
    return (
      <>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => onClickChange(item)}
        >
          {item ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={styles.subject}>
                  {printSectionHeader("ALLERGIES")} change
                </Text>
              </View>
              <Text style={styles.date}>
                {moment(item.lastUpdated).format("DD MMMM YYYY, HH:mm")}
              </Text>
            </>
          ) : null}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerText}>Approvals</Text>
        <View style={{ flexDirection: "row" }}>
          <>
            {fetchPendingProfileLoading || fetchProfileLoading ? (
              <View
                style={{
                  flex: 3,
                  width: "50%",
                  // marginLeft: "-50%",
                  marginTop: "-5%",
                  flexDirection: "row",
                }}
              >
                <Text>Retrieving data...</Text>
              </View>
            ) : differences && differences.length > 0 ? (
              <>
                <ScrollView>
                  {data.map(
                    (item, idx) => (
                      <View key={`difference-list-${idx}`}>
                        {renderItem(item)}
                      </View>
                    )
                    // renderItem(item)
                  )}
                </ScrollView>
              </>
            ) : error !== "" ? (
              <View>
                <Text>{error}</Text>
              </View>
            ) : null}
            <View
              style={{
                flex: 3,
                width: "50%",
                // marginLeft: "20%",
                marginTop: "-2%",
                flexDirection: "row",
              }}
            >
              <View style={styles.verticalDivider} />
              <View style={{ flexDirection: "column", width: "100%" }}>
                {differences && (
                  <NewInfoScreen
                    differences={differences}
                    studentName={updatedStudentData.name}
                    profileID={profileID}
                  />
                )}
              </View>
            </View>
          </>
        </View>
      </View>
    </>
  );
};

export default ApprovalsScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "pink",
    // width: "100%",
    marginLeft: 20,
    marginTop: 60,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "InterBold",
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    marginBottom: 20,
  },
  listView: {
    width: "50%",
    paddingBottom: 60,
  },
  dotContainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 320,
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontFamily: "InterSemiBold",
    fontSize: 18,
    marginBottom: 8,
  },
  cardContainer: {
    width: "60%",
    minHeight: 45,
    borderColor: "#A0B2AF",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "#D9D9D933",
    //backgroundColor: "pink",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 20,
    backgroundColor: "#99B8BE99",
    height: 40,
    width: 150,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    alignSelf: "center",
    color: "#024552",
    fontFamily: "InterMedium",
  },
  subject: {
    fontFamily: "InterMedium",
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    fontFamily: "InterMedium",
    color: colors.darkGrey,
  },
  verticalDivider: {
    height: "150%",
    borderLeftColor: "#D9D9D980",
    borderLeftWidth: 1,
    marginRight: 50,
    marginLeft: -60,
  },
  emptyStateMessage: {
    color: "#99B8BE",
    fontFamily: "InterMedium",
    fontSize: 16,
  },
  emptyStateContainer: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
  },
});
