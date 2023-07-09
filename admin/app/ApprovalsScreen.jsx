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
  const {
    fetchPendingProfileLoading,
    fetchProfileLoading,
    approvePendingProfileSuccessful,
  } = useSelector((state) => state.studentProfile);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const [differencesObj, setDifferencesObj] = useState([]);
  const [dataDifferences, setDataDifferences] = useState([]);
  // const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [studentName, setStudentName] = useState("");
  const [profileID, setProfileID] = useState("");

  const onClickChange = (item) => {
    //console.log(item, profileID, studentName);
    setProfileID(item.profileID);
    setStudentName(item.studentName);
    setDataDifferences(item.differences);
  };

  const compareStudentData = (dataSet1, dataSet2, differences) => {
    //console.log(dataSet1);
    const student1 = dataSet1;
    const student2 = dataSet2;
    // Compare the properties or values of the objects
    // Compare the name property
    if (student1.name !== student2.name) {
      console.log("Name difference:", student1.name, "vs", student2.name);
    }
    // console.log(student1.information && student1.information);
    // console.log(student2.information);
    if (student1.information && student2.information) {
      for (let i = 0; i < 5; i++) {
        const info1 = student1.information[i];
        const info2 = student2.information[i];
        var oldData = [];
        var newData = [];
        // Compare the section array
        if (info1.section.length > info2.section.length) {
          // console.log("that if condition", info1.sectionHeader);
          for (let j = info2.section.length; j < info1.section.length; j++) {
            oldData.push(info1.section[j]);
          }
          differences.push({
            sectionHeader: info1.sectionHeader,
            oldData,
            newData: [],
          });
        }
        if (info1.section.length < info2.section.length) {
          //console.log("this if condition");
          for (let j = info1.section.length; j < info2.section.length; j++) {
            newData.push(info2.section[j]);
          }
          differences.push({
            sectionHeader: info1.sectionHeader,
            oldData: [],
            newData,
          });
        }

        for (let k = 0; k < info1.section.length; k++) {
          const section1 = info1.section[k];
          const section2 = info2.section[k];
          oldData = [];
          newData = [];
          // console.log(info1.section[k]);
          if (
            info1.sectionHeader === "PRIMARY CONTACTS" ||
            info1.sectionHeader === "EMERGENCY CONTACTS"
          ) {
            if (
              section1.name !== section2.name ||
              section1.relationship !== section2.relationship ||
              section1.email !== section2.email ||
              section1.phoneNumber !== section2.phoneNumber ||
              section1.address !== section2.address
            ) {
              oldData.push({
                name: section1.name,
                relationship: section1.relationship,
                email: section1.email,
                phoneNumber: section1.phoneNumber,
                address: section1.address,
              });
              newData.push({
                name: section2.name,
                relationship: section2.relationship,
                email: section2.email,
                phoneNumber: section2.phoneNumber,
                address: section2.address,
              });
              differences.push({
                sectionHeader: info1.sectionHeader,
                oldData,
                newData,
              });
            }
          }
          if (info1.sectionHeader === "ALLERGIES") {
            //console.log(section1, section2);
            if (
              section2 &&
              (section1.name !== section2.name ||
                section1.severity !== section2.severity)
            ) {
              // console.log("Difference");
              oldData.push({
                name: section1.name,
                severity: section1.severity,
              });
              newData.push({
                name: section2.name,
                severity: section2.severity,
              });
              differences.push({
                sectionHeader: info1.sectionHeader,
                oldData,
                newData,
              });
            }
          }
          if (info1.sectionHeader === "MEDICATIONS") {
            if (
              section2 &&
              (section1.name !== section2.name ||
                section1.dosage !== section2.dosage ||
                section1.frequency !== section2.frequency ||
                section1.length !== section2.length)
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
              differences.push({
                sectionHeader: info1.sectionHeader,
                oldData,
                newData,
              });
            }
          }
          if (info1.sectionHeader === "BLOOD GROUP") {
            if (section1.name !== section2.name) {
              differences.push({
                sectionHeader: info1.sectionHeader,
                oldData: { name: section1.name },
                newData: { name: section2.name },
              });
            }
          }
        }
      }
    }
  };

  const retrieveData = async () => {
    await dispatch(fetchPendingProfile("")).then((response) => {
      if (response.error) {
        setError("Something went wrong, please try again.");
      } else {
        //console.log(response);
        const data = response.payload.data.getAllMatchedPendingProfileInfos[0];
        if (data) {
          const newDetails = data[0].details.replace(/\\/g, "");
          const oldDetails = data[1].details.replace(/\\/g, "");
          const oldStudentData = JSON.parse(oldDetails);
          const updatedStudentData = JSON.parse(newDetails);
          const d = [];
          // console.log(newDetails);

          getInfo(
            {
              profileID: data[0]._id,
              details: updatedStudentData,
              lastUpdated: data[0].updatedAt,
            },
            { details: data[1] ? oldStudentData : null },
            d
          );
          // console.log(typeof oldDetails);
          const updatedData = {
            profileID: data[0]._id,
            differences: d,
            studentName: oldStudentData.name,
            lastUpdated: data[0].updatedAt,
          };
          // console.log(updatedData.differences);
          const updated = [...differencesObj];
          updated.push(updatedData);
          setDifferencesObj(updated);
        } else {
          setDataDifferences([]);
          setDifferencesObj([]);
        }
      }
    });
  };

  useEffect(() => {
    retrieveData();
  }, [approvePendingProfileSuccessful]);

  const getInfo = (updatedStudentData, oldStudentData, d) => {
    //console.log(updatedStudentData, oldStudentData);
    if (oldStudentData !== {} && updatedStudentData !== {}) {
      compareStudentData(oldStudentData.details, updatedStudentData.details, d);
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
    }
    if (sectionHeader === "MEDICATIONS") {
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
    //console.log(item);
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
                <Text style={styles.subject}>{item.studentName}</Text>
              </View>
              <Text style={styles.date}>
                {moment(item.lastUpdated).utc().format("DD MMMM YYYY, h:mm a")}
              </Text>
            </>
          ) : null}
        </TouchableOpacity>
      </>
    );
  };
  console.log(differencesObj);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerText}>Approvals</Text>
        <View style={{ flexDirection: "row", height: "100%" }}>
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
            ) : differencesObj && differencesObj.length > 0 ? (
              <>
                <ScrollView>
                  {differencesObj.map(
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
            ) : (
              <Text>No changes to approve.</Text>
            )}
            <View
              style={{
                flex: 3,
                width: "50%",
                marginTop: "-2%",
                marginLeft: differencesObj.length > 0 ? "-5%" : "10%",
                flexDirection: "row",
                height: "100%",
              }}
            >
              <View style={styles.verticalDivider} />
              {differencesObj.length > 0 && studentName === "" && (
                <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateMessage}>
                    Select a change to approve.
                  </Text>
                </View>
              )}
              <View style={{ flexDirection: "column", width: "100%" }}>
                {studentName ? (
                  <NewInfoScreen
                    differences={dataDifferences}
                    studentName={studentName}
                    profileID={profileID}
                    differencesObj={differencesObj}
                    setDifferencesObj={setDifferencesObj}
                  />
                ) : null}
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
    height: "100%",
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
    borderLeftColor: "#D9D9D980",
    borderLeftWidth: 1,
    marginRight: 50,
    marginLeft: -60,
  },
  emptyStateMessage: {
    color: "#99B8BE",
    fontFamily: "InterMedium",
    fontSize: 16,
    // marginLeft: "20%",
  },
  emptyStateContainer: {
    //flex: 1,
    marginLeft: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
});
